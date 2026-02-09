import { ARTICLES, NEWSPAPER_NAME, SCHOOL_NAME, SCHOOL_SUBTITLE } from "@/constants";

export default function Home() {
  const today = new Intl.DateTimeFormat('el-GR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const currentIssue = 1;
  const issueArticles = ARTICLES.filter(a => a.issue === currentIssue);

  // Mapping χρωμάτων ανά κατηγορία
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
    <div className="min-h-screen bg-[#fffdf5] text-stone-900 font-serif">
      <div className="h-4 bg-gradient-to-r from-blue-400 via-yellow-400 to-red-400 w-full" />
      
      {/* Header */}
      <header className="border-b-4 border-stone-800 py-6 px-4 text-center relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm font-sans font-black text-blue-700 uppercase mb-2 tracking-widest">
            {SCHOOL_NAME}
          </div>
          
          <div className="flex justify-between items-end border-b-2 border-stone-400 pb-2 mb-4 text-xs font-sans uppercase tracking-widest font-bold text-stone-500">
            <span>Τεύχος #{currentIssue}</span>
            <span className="bg-yellow-200 px-3 py-1 rounded-full text-stone-800">{today}</span>
            <span>ΠΕΙΡΑΙΑΣ</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-2 text-stone-900 drop-shadow-sm uppercase">
            {NEWSPAPER_NAME}
          </h1>
          
          <div className="text-lg font-sans font-bold text-stone-600 italic">
            {SCHOOL_SUBTITLE}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Articles Column */}
          <div className="md:col-span-8 space-y-16">
            {issueArticles.map((article, index) => {
              const categoryColor = categoryColors[article.category] || categoryColors["DEFAULT"];
              const textColor = categoryColor.replace('bg-', 'text-');
              
              // Highlight Layout
              if (article.layout === 'highlight') {
                return (
                  <article key={article.id} className={`${index !== 0 ? 'border-t-2 border-stone-200 pt-16' : ''} bg-white p-8 rounded-3xl border-l-8 ${categoryColor.replace('bg-', 'border-')} shadow-sm`}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`${categoryColor} px-4 py-1.5 text-sm font-sans font-black text-white rounded-full uppercase tracking-tighter`}>
                        ★ {article.category}
                      </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8 text-stone-900 tracking-tight">
                      {article.title}
                    </h2>
                    <div className="prose prose-stone max-w-none mb-8">
                      <div className="text-2xl leading-relaxed text-stone-800 italic font-medium">
                        {article.content.map((p, i) => (
                          <p key={i} className="mb-4">{p}</p>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-sans font-bold text-stone-400 uppercase">
                      <span>Από {article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                  </article>
                );
              }

              // Minimal Layout
              if (article.layout === 'minimal') {
                return (
                  <article key={article.id} className={`${index !== 0 ? 'border-t-2 border-stone-200 pt-16' : ''}`}>
                    <div className="flex items-center gap-2 mb-2 text-xs font-sans font-bold uppercase tracking-widest text-stone-400">
                      <span className={textColor}>{article.category}</span>
                      <span>/</span>
                      <span>{article.date}</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-stone-900 border-b border-stone-100 pb-2">
                      {article.title}
                    </h2>
                    <div className="text-lg leading-snug text-stone-600 font-sans">
                      {article.content.join(' ')}
                    </div>
                    <div className="mt-4 text-xs font-sans font-black text-stone-300 uppercase tracking-tighter italic">
                      Συντάκτης: {article.author}
                    </div>
                  </article>
                );
              }

              // Default Layout (Classic Newspaper)
              return (
                <article key={article.id} className={`${index !== 0 ? 'border-t-2 border-stone-200 pt-16' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`${categoryColor} px-3 py-1 text-xs font-sans font-black text-white rounded-md shadow-sm uppercase`}>
                      {article.category}
                    </span>
                    <span className="text-sm font-sans text-stone-500 font-bold uppercase tracking-wider">
                      ΤΑΞΗ {article.grade}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-stone-900">
                    {article.title}
                  </h2>
                  
                  <div className="flex items-center gap-4 mb-8 text-sm font-sans font-bold text-stone-600 bg-stone-100 w-fit px-4 py-2 rounded-lg border border-stone-200">
                    <span className="flex items-center gap-1">✍️ {article.author}</span>
                    <span className="text-stone-300">|</span>
                    <span className="flex items-center gap-1">📅 {article.date}</span>
                  </div>

                  <div className="prose prose-stone max-w-none">
                    <div className="columns-1 md:columns-2 gap-10 text-xl leading-relaxed text-justify text-stone-800">
                      {article.content.map((p, i) => (
                        <p key={i} className={`mb-6 ${i === 0 ? `first-letter:text-6xl first-letter:font-black ${textColor} first-letter:mr-3 first-letter:float-left` : ''}`}>
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-2xl border-4 border-blue-600 shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-blue-800 border-b-2 border-blue-100 pb-2">
                📣 Πρόσφατα Άρθρα
              </h3>
              <ul className="space-y-4 font-sans text-sm font-bold text-stone-700">
                {issueArticles.slice(0, 5).map((art) => (
                  <li key={art.id} className="flex gap-3 items-start group cursor-pointer hover:text-blue-600 transition-colors">
                    <span className="text-blue-600">★</span>
                    <span>{art.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-100 p-8 rounded-2xl border-2 border-yellow-300 shadow-sm relative rotate-1">
              <div className="absolute -top-3 -right-3 text-3xl">✏️</div>
              <p className="text-xl font-medium italic text-stone-700 leading-relaxed text-center">
                "Το βιβλίο είναι ένας κήπος που κουβαλάς στην τσέπη σου."
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-16 px-4 mt-20 border-t-8 border-blue-600">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">{NEWSPAPER_NAME}</h2>
          <p className="text-sm text-blue-400 font-sans font-black uppercase tracking-widest">{SCHOOL_NAME}</p>
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
