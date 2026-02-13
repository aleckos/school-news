import { ARTICLES, NEWSPAPER_NAME, SCHOOL_NAME, SCHOOL_SUBTITLE } from "@/constants";
import { getArticles, getSettings } from "@/sanity/lib/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

export default async function Home() {
  const settings = await getSettings();
  
  const today = settings?.issueDate || new Intl.DateTimeFormat('el-GR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const currentIssue = settings?.currentIssue || 1;
  const newspaperName = settings?.title || NEWSPAPER_NAME;
  const schoolName = settings?.schoolName || SCHOOL_NAME;
  const theme = settings?.theme || 'playful';

  const sanityArticles = await getArticles(currentIssue);
  const issueArticles = sanityArticles.length > 0 
    ? sanityArticles 
    : ARTICLES.filter(a => a.issue === currentIssue);

  // Theme Config
  const themes: { [key: string]: { bg: string, text: string, accent: string, border: string } } = {
    playful: { 
      bg: "bg-[#fffdf5]", 
      text: "text-stone-900", 
      accent: "from-blue-400 via-emerald-400 to-red-400", 
      border: "border-blue-600" 
    },
    classic: { 
      bg: "bg-white", 
      text: "text-black", 
      accent: "from-stone-800 via-stone-400 to-stone-800", 
      border: "border-stone-800" 
    },
    modern: { 
      bg: "bg-slate-50", 
      text: "text-slate-900", 
      accent: "from-indigo-500 via-purple-500 to-pink-500", 
      border: "border-indigo-600" 
    },
    dark: { 
      bg: "bg-stone-900", 
      text: "text-stone-100", 
      accent: "from-orange-500 via-red-500 to-purple-500", 
      border: "border-orange-500" 
    }
  };

  const activeTheme = themes[theme] || themes.playful;

  const categoryColors: { [key: string]: string } = {
    "ΠΟΛΙΤΙΣΜΟΣ": "bg-purple-600",
    "ΓΕΩΓΡΑΦΙΑ": "bg-green-600",
    "ΠΕΡΙΒΑΛΛΟΝ": "bg-emerald-600",
    "ΝΕΑ": "bg-red-600",
    "ΑΘΛΗΤΙΚΑ": "bg-orange-600",
    "ΕΠΙΣΤΗΜΗ": "bg-blue-600",
    "DEFAULT": "bg-stone-600"
  };

  return (
    <div className={`min-h-screen ${activeTheme.bg} ${activeTheme.text} transition-colors duration-500 font-serif`}>
      <div className={`h-4 bg-gradient-to-r ${activeTheme.accent} w-full`} />
      
      {/* Header */}
      <header className={`border-b-4 ${theme === 'classic' ? 'border-double' : ''} border-stone-800 py-6 px-4 text-center relative`}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-sm font-sans font-black ${theme === 'dark' ? 'text-orange-400' : 'text-blue-700'} uppercase mb-2 tracking-widest`}>
            {schoolName}
          </div>
          
          <div className="flex justify-between items-end border-b-2 border-stone-400 pb-2 mb-4 text-xs font-sans uppercase tracking-widest font-bold text-stone-500 text-current opacity-70">
            <span>Τεύχος #{currentIssue}</span>
            <span className="bg-yellow-200 px-3 py-1 rounded-full text-stone-800">{today}</span>
            <span>ΠΕΙΡΑΙΑΣ</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-2 drop-shadow-sm uppercase">
            {newspaperName}
          </h1>
          
          <div className={`text-lg font-sans font-bold ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'} italic`}>
            {SCHOOL_SUBTITLE}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Articles Column */}
          <div className="md:col-span-8 space-y-16">
            {issueArticles.map((article: any, index: number) => {
              const categoryColor = categoryColors[article.category] || categoryColors["DEFAULT"];
              const textColor = categoryColor.replace('bg-', 'text-');
              
              return (
                <div key={article._id || article.id}>
                  {/* Article Image */}
                  {article.image && (
                    <div className="mb-8 relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-2xl shadow-md border border-stone-200">
                      <Image 
                        src={urlFor(article.image).url()} 
                        alt={article.title || "Εικόνα άρθρου"}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-cover transition-transform hover:scale-105 duration-700"
                        priority={index === 0}
                      />
                    </div>
                  )}

                  {article.layout === 'highlight' ? (
                    <article className={`${index !== 0 ? 'pt-4' : ''} ${theme === 'dark' ? 'bg-stone-800 text-white' : 'bg-white text-stone-900'} p-8 rounded-3xl border-l-8 ${categoryColor.replace('bg-', 'border-')} shadow-sm`}>
                      <div className="flex items-center gap-3 mb-6">
                        <span className={`${categoryColor} px-4 py-1.5 text-sm font-sans font-black text-white rounded-full uppercase tracking-tighter`}>
                          ★ {article.category}
                        </span>
                      </div>
                      <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8 tracking-tight">
                        {article.title}
                      </h2>
                      <div className="prose prose-stone max-w-none mb-8">
                        <div className="text-2xl leading-relaxed italic font-medium">
                          {article.content.map((p: string, i: number) => (
                            <p key={i} className="mb-4">{p}</p>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-sans font-bold text-stone-400 uppercase border-t border-stone-100 pt-4">
                        <span>Από {article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                    </article>
                  ) : article.layout === 'minimal' ? (
                    <article>
                      <div className="flex items-center gap-2 mb-2 text-xs font-sans font-bold uppercase tracking-widest text-stone-400">
                        <span className={textColor}>{article.category}</span>
                        <span>/</span>
                        <span>{article.date}</span>
                      </div>
                      <h2 className="text-3xl font-bold mb-4 border-b border-stone-200 pb-2">
                        {article.title}
                      </h2>
                      <div className="text-xl leading-relaxed font-sans">
                        {article.content.join(' ')}
                      </div>
                      <div className="mt-4 text-xs font-sans font-black text-stone-400 uppercase tracking-tighter italic">
                        Συντάκτης: {article.author}
                      </div>
                    </article>
                  ) : (
                    <article>
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`${categoryColor} px-3 py-1 text-xs font-sans font-black text-white rounded-md shadow-sm uppercase`}>
                          {article.category}
                        </span>
                        <span className="text-sm font-sans text-stone-400 font-bold uppercase tracking-wider">
                          ΤΑΞΗ {article.grade}
                        </span>
                      </div>
                      
                      <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        {article.title}
                      </h2>
                      
                      <div className={`flex items-center gap-4 mb-8 text-sm font-sans font-bold ${theme === 'dark' ? 'bg-stone-800' : 'bg-stone-100'} w-fit px-4 py-2 rounded-lg border border-stone-200`}>
                        <span className="flex items-center gap-1 text-current">✍️ {article.author}</span>
                        <span className="text-stone-300">|</span>
                        <span className="flex items-center gap-1 text-current">📅 {article.date}</span>
                      </div>

                      <div className="prose prose-stone max-w-none">
                        <div className="columns-1 md:columns-2 gap-10 text-xl leading-relaxed text-justify">
                          {article.content.map((p: string, i: number) => (
                            <p key={i} className={`mb-6 ${i === 0 ? `first-letter:text-6xl first-letter:font-black first-letter:${textColor} first-letter:mr-3 first-letter:float-left` : ''}`}>
                              {p}
                            </p>
                          ))}
                        </div>
                      </div>
                    </article>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-4 space-y-8">
            <div className={`p-6 rounded-2xl border-4 ${activeTheme.border} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${theme === 'dark' ? 'bg-stone-800' : 'bg-white'}`}>
              <h3 className={`text-xl font-black mb-4 uppercase tracking-tight ${theme === 'dark' ? 'text-orange-400' : 'text-blue-800'} border-b-2 border-stone-100 pb-2`}>
                📣 Πρόσφατα Άρθρα
              </h3>
              <ul className="space-y-4 font-sans text-sm font-bold">
                {issueArticles.slice(0, 5).map((art: any) => (
                  <li key={art._id || art.id} className="flex gap-3 items-start group cursor-pointer hover:translate-x-1 transition-transform">
                    <span className={theme === 'dark' ? 'text-orange-500' : 'text-blue-600'}>★</span>
                    <span className="text-current">{art.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${theme === 'dark' ? 'bg-stone-800 border-orange-500' : 'bg-yellow-100 border-yellow-300'} p-8 rounded-2xl border-2 shadow-sm relative rotate-1`}>
              <div className="absolute -top-3 -right-3 text-3xl">✏️</div>
              <p className="text-xl font-medium italic leading-relaxed text-center">
                "Το βιβλίο είναι ένας κήπος που κουβαλάς στην τσέπη σου."
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className={`bg-stone-900 text-stone-300 py-16 px-4 mt-20 border-t-8 ${theme === 'dark' ? 'border-orange-500' : 'border-blue-600'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">{newspaperName}</h2>
          <p className="text-sm text-blue-400 font-sans font-black uppercase tracking-widest">{schoolName}</p>
          <div className="mt-8 flex justify-center gap-4 text-2xl opacity-50">
            <span>📚</span><span>🎭</span><span>🎨</span><span>⚽</span>
          </div>
          <p className="text-xs mt-8 text-stone-600 uppercase tracking-widest font-bold">
            Δημιουργία: Ανδριάνα • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
