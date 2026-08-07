import { useEffect, useState } from 'react'
import './App.css'

const QUERY = 'SELECT * FROM anta.profil WHERE disponible = true;'

function useTypedText(fullText, speed = 45) {
  const [text, setText] = useState('')
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i += 1
      setText(fullText.slice(0, i))
      if (i >= fullText.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [fullText, speed])
  return text
}

const SKILLS = [
  { group: 'Big Data', items: ['Hadoop', 'HDFS', 'Apache Hive', 'SQL'] },
  { group: 'ERP & Gestion', items: ['Odoo', 'Modélisation de données', 'Gestion de projet'] },
  { group: 'Outils', items: ['Linux / WSL', 'Git', 'Python', 'React'] },
]

const PROJECTS = [
  {
    id: '01',
    title: 'Teranga Auto Dakar',
    tag: 'ERP · Odoo',
    description:
      "Conception d'un site de vente et location de véhicules multi-marques sur Odoo Enterprise : configuration des modules, catégories de véhicules et habillage visuel complet.",
    stack: ['Odoo', 'Modules ERP', 'UI/UX'],
  },
  {
    id: '02',
    title: 'Pipeline Big Data — Hadoop / Hive',
    tag: 'Data Engineering',
    description:
      "Mise en place d'un environnement Hadoop/Hive sous WSL : ingestion de données dans HDFS, modélisation de schémas et résolution d'incidents (corruption de métastore, erreurs de schéma).",
    stack: ['Hadoop', 'Hive', 'HDFS'],
  },
]

const SCHEMA_NODES = [
  { id: 'hdfs', label: 'HDFS', x: 60, y: 40 },
  { id: 'hive', label: 'Hive', x: 220, y: 40 },
  { id: 'sql', label: 'SQL', x: 380, y: 40 },
  { id: 'odoo', label: 'Odoo / ERP', x: 220, y: 150 },
]

function SchemaDiagram() {
  return (
    <svg
      className="schema-svg"
      viewBox="0 0 440 190"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Schéma reliant Hadoop, Hive, SQL et Odoo"
    >
      <line x1="90" y1="40" x2="190" y2="40" className="schema-edge" />
      <line x1="250" y1="40" x2="350" y2="40" className="schema-edge" />
      <line x1="220" y1="60" x2="220" y2="130" className="schema-edge" />
      <line x1="60" y1="55" x2="200" y2="140" className="schema-edge schema-edge-dim" />
      <line x1="380" y1="55" x2="240" y2="140" className="schema-edge schema-edge-dim" />

      {SCHEMA_NODES.map((n) => (
        <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
          <rect x="-38" y="-16" width="76" height="32" rx="6" className="schema-node" />
          <text x="0" y="5" textAnchor="middle" className="schema-label">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function App() {
  const typed = useTypedText(QUERY)
  const done = typed.length === QUERY.length

  return (
    <div className="page">
      <nav className="nav">
        <span className="nav-mark">anta.diaw</span>
        <div className="nav-links">
          <a href="#projets">projets</a>
          <a href="#competences">compétences</a>
          <a href="#contact">contact</a>
        </div>
      </nav>

      <header className="hero">
        <div className="terminal">
          <div className="terminal-bar">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="terminal-title">requête — profil.sql</span>
          </div>
          <div className="terminal-body">
            <p className="terminal-line">
              <span className="prompt">anta@dakar</span>
              <span className="prompt-sep">:~$</span> {typed}
              <span className={`cursor ${done ? 'cursor-blink' : ''}`}>▌</span>
            </p>
            {done && (
              <div className="terminal-output">
                <p>&gt; 1 ligne trouvée.</p>
                <p>
                  &gt; nom : <strong>Ndeye Anta Diaw</strong>
                </p>
                <p>&gt; statut : Master 1 IAGE — Institut Supérieur d'Informatique, Dakar</p>
                <p>&gt; recherche : stage / premier emploi en informatique</p>
              </div>
            )}
          </div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Portfolio</p>
          <h1>
            Je construis des systèmes de données
            <br />
            <span className="accent">fiables et utiles.</span>
          </h1>
          <p className="hero-text">
            Étudiante en Master Informatique Appliquée à la Gestion des Entreprises (IAGE),
            je travaille à l'intersection du Big Data et des systèmes de gestion — de l'ingestion
            de données dans Hadoop/Hive à la configuration d'ERP avec Odoo.
          </p>
          <div className="hero-actions">
            <a href="#projets" className="btn btn-primary">
              Voir mes projets
            </a>
            <a href="#contact" className="btn btn-ghost">
              Me contacter
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="competences" className="section">
          <p className="eyebrow">Stack</p>
          <h2>Ce que je sais faire tourner</h2>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <div className="skill-card" key={s.group}>
                <h3>{s.group}</h3>
                <ul>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="schema-block">
            <SchemaDiagram />
            <p className="schema-caption">
              De la donnée brute (HDFS/Hive) aux outils de gestion (Odoo) — je relie les deux mondes.
            </p>
          </div>
        </section>

        <section id="projets" className="section">
          <p className="eyebrow">Projets</p>
          <h2>Travaux récentes</h2>
          <div className="projects-list">
            {PROJECTS.map((p) => (
              <article className="project-card" key={p.id}>
                <span className="project-id">{p.id}</span>
                <div>
                  <div className="project-head">
                    <h3>{p.title}</h3>
                    <span className="project-tag">{p.tag}</span>
                  </div>
                  <p>{p.description}</p>
                  <div className="project-stack">
                    {p.stack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <p className="eyebrow">Contact</p>
          <h2>Discutons d'une opportunité</h2>
          <p className="contact-text">
            Basée à Dakar, disponible pour un stage ou un premier poste en développement,
            data ou ERP.
          </p>
          <div className="contact-links">
            <a href="mailto:anta.diaw@example.com">anta.diaw@example.com</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Anta Diaw — Dakar,Sénégal</span>
      </footer>
    </div>
  )
}

export default App
