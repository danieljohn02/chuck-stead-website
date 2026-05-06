import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

type Project = {
  num: string;
  title: string;
  loc: string;
  desc: string;
  images: { src: string; cap: string }[];
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "Monsey Glen",
    loc: "Rockland County, NY",
    desc: "Archaeological survey of a county-owned park believed to be the crossroads of 17th-century Dutch merchants, African slaves, and Munsi Algonquin Indians. Rock-shelter dwellings, early sandstone quarry work, and an adjacent 19th-century railroad line are under study.",
    images: [
      { src: "/images/09-monsey-carved-steps.png", cap: "Carved steps at Dutch Quarry, Monsey Glen" },
      { src: "/images/10-monsey-munsi-rockshelter.png", cap: "Munsi Rockshelter, Monsey Glen" },
    ],
  },
  {
    num: "02",
    title: "Piermont / Ramapo Rail Trail",
    loc: "Hudson River → Ramapo Mountains, NY",
    desc: "A trail-wide ecological survey of the earliest commercial track of the great Erie Railroad — a line believed to be an extension of the Underground Railroad. Surface soils require close study before the rail trail is constructed, in search of historic evidence connecting to family stories of flight.",
    images: [
      { src: "/images/11-rail-trail.jpg", cap: "19th-century track bed, Piermont / Ramapo" },
    ],
  },
  {
    num: "03",
    title: "Harmony Hall Cellar Kitchen",
    loc: "Sloatsburg, NY",
    desc: "In the cellar of an 1848 structure built by industrialist Jacob Sloat is a third kitchen reportedly used as a “safe station” on the Underground Railroad. With the Town's clearance, planned study covers soil beneath the floorboards, grout pockets within the hearth brickwork, and carved dimples over the hearth.",
    images: [
      { src: "/images/12-lenik-cellar.png", cap: "Archaeologist Ed Lenik speaking to HBCU scholars in cellar kitchen" },
      { src: "/images/13-hearth.png", cap: "Cellar kitchen hearth, Harmony Hall" },
    ],
  },
  {
    num: "04",
    title: "Brook Street School",
    loc: "Hillburn, NY",
    desc: "Late-19th-century structure of which only the foundation remains, in private hands. This was the segregated school where Native and African children were kept apart from the white students of Hillburn — a site whose study is essential to the recovery of regional civil-rights history.",
    images: [
      { src: "/images/14-brook-school.png", cap: "Foundation of Brook School" },
    ],
  },
  {
    num: "05",
    title: "Cemetery Study",
    loc: "Regional, NY / NJ",
    desc: "Marked and unmarked grave sites of both American natives and African peoples — both freed and enslaved — are continually being discovered in this region. Site description, inventory, identification, and repair is an ongoing, multi-year project, reported periodically.",
    images: [
      { src: "/images/15-cemetery-mahwah.png", cap: "Putative ‘slave’ cemetery in Mahwah, NJ" },
      { src: "/images/16-ramapough-cemetery.png", cap: "Ramapough Mtn. Indian Cemetery, Mahwah, NJ" },
    ],
  },
  {
    num: "06",
    title: "Sacred Rocks",
    loc: "Multi-site, NY / NJ",
    desc: "Prayer stones, rock shelters, and dancing stones are part of the native way of being. For fugitive slaves, stone cairns, engraved markings, and unique glacial erratics functioned as signposts of safe haven. Many of these sites are under threat from development; identifying them offers a means of protection.",
    images: [
      { src: "/images/17-spook-rock.png", cap: "Spook Rock" },
      { src: "/images/18-indian-rock.png", cap: "Indian Rock" },
      { src: "/images/19-split-rock.png", cap: "Split Rock" },
    ],
  },
  {
    num: "07",
    title: "19th-Century Iron Works",
    loc: "Ramapo Mountains, NY",
    desc: "Mine shafts, charcoal circles, blast furnaces and the like were the places of labor for a diverse working population — many tethered to stories of native and fugitive-slave presence. Documented examples include Southfield furnace (Orange Co.), Potake Pond shelters, and the Dutch ore mines at Lake Mombasha.",
    images: [
      { src: "/images/20-ramapo-hamlet.png", cap: "Ramapo Hamlet, 1815 — History of Rockland County, by David Cole, 1884" },
    ],
  },
  {
    num: "08",
    title: "Ramapo Saltbox",
    loc: "Torne Valley, NY",
    desc: "An early-19th-century saltbox-styled ironworker's home, first documented by folklorist Carl Carmer in 1949, saved and reconstructed in the late 2010s as a site for intertribal councils, social-history research, and environmental study. Now again under threat of demolition — work is underway to save it and restore it as a home for Living History.",
    images: [
      { src: "/images/21-saltbox-1997.png", cap: "Ramapo Saltbox in Hamlet, 1997" },
      { src: "/images/22-saltbox-2016.png", cap: "Ramapo Saltbox ERC, 2016" },
    ],
  },
  {
    num: "09",
    title: "Spring House Rock Shelter",
    loc: "Sloatsburg, NY",
    desc: "Archaeologist Ed Lenik's excavation. A total of 213 projectile points were recovered and analyzed, providing useful temporal indicators of Native American cultural periods. Stratigraphic excavation methodology — small trowels, dust pans, hardware-cloth screens — is fully documented.",
    images: [
      { src: "/images/23-springhouse-shelter.png", cap: "Shelter site in Sloatsburg NY — Photo, Lenik, 1988" },
      { src: "/images/24-excavation-measuring.png", cap: "Measuring the excavation units at Spring House Rock Shelter" },
      { src: "/images/26-projectile-points.png", cap: "Projectile points: temporal indicators of Native American cultural periods" },
    ],
  },
];

const VIDEOS = [
  { lab: "Field Report", ttl: "Monsey Glen" },
  { lab: "Interview", ttl: "Archaeologist Ed Lenik" },
  { lab: "Lecture", ttl: "Black Indians: A History" },
  { lab: "Field Report", ttl: "Spring House Rock Shelter" },
  { lab: "Community Conversation", ttl: "HBCU Scholars Visit" },
  { lab: "Coming Soon", ttl: "New segments in production" },
];

const ENGAGEMENTS = [
  { num: "I",   title: "Guided Field Trips",          body: "Active research sites in the Hudson Valley and Ramapo Mountains, available to schools, colleges, and civic organizations." },
  { num: "II",  title: "Lectures & Workshops",         body: "Traditional Ecological Knowledge, the African–Indigenous convergence, Eugenics and blood-purity laws, the Underground Railroad, and Living History methodology." },
  { num: "III", title: "Curriculum Consultation",      body: "K–12 and higher education in the United States and Angola — recovery of absent histories and the integration of indigenous knowledge systems." },
  { num: "IV",  title: "Research Collaboration",       body: "Archaeologists, folklorists, historians, and community scholars — field work, site assessment, and co-authorship." },
  { num: "V",   title: "Community Programs",           body: "Living History programming for cultural centers, tribal councils, churches, and community organizations." },
  { num: "VI",  title: "International Partnerships",   body: "Angola and the broader African continent — educational exchanges rooted in shared indigenous heritage and diaspora memory." },
];

export default function Page() {
  return (
    <>
      <Nav />

      {/* ===================== HERO ===================== */}
      <section id="hero" className="hero">
        <div className="wrap">
          <div className="hero-content">
            <div className="hero-grid">
              <div className="hero-main">
                <p className="eyebrow">African Village on Native American Land</p>
                <h1>
                  Dr. Chuck Stead<br />
                  <em>Eco Historian</em>
                </h1>
                <blockquote>
                  “Forever weaving ourselves into the fabric of our traditions, our failures, our reemergence.”
                </blockquote>
                <div className="hero-cta">
                  <a className="btn btn-primary" href="#research">Explore the Research</a>
                  <a className="btn btn-ghost" href="#contact">Contact Dr. Stead</a>
                </div>
              </div>
              <aside className="hero-aside">
                <p className="subtitle">
                  Research, fieldwork, and storytelling at the convergence of African and Native American Indigenous heritage — the intertribal world that author William Loren Katz identified as the <em>“Black Indians.”</em>
                </p>
              </aside>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><div className="num">25+</div><div className="lab">Years Teaching</div></div>
              <div className="hero-stat"><div className="num">PhD</div><div className="lab">Environmental Studies</div></div>
              <div className="hero-stat"><div className="num">2</div><div className="lab">Continents of Research</div></div>
              <div className="hero-stat"><div className="num">9+</div><div className="lab">Active Field Sites</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== RESEARCH ===================== */}
      <section id="research">
        <div className="wrap">
          <Reveal as="header" className="section-head">
            <p className="eyebrow"><span className="num">§ 01</span> Primary Research</p>
            <h2>African Village on Native Land</h2>
          </Reveal>

          <div className="two-col">
            <Reveal>
              <p className="lead">
                Research into the interaction of African Indigenous peoples with Native American Indigenous peoples — a convergence that produced an intertribal culture, what author William Loren Katz identified as the “Black Indians.”
              </p>

              <p>
                In the 1880s a consortium of progressive parties, agencies, and theological bodies helped form the Bureau of Indian Affairs (BIA), a federal department charged with solving what was termed “the Indian Problem” — the challenge of assimilation for the remaining indigenous population of the United States. Despite the massive elimination of native culture by the close of the U.S./Indian Wars, the North American Indigenous remained very much alive. Alongside educational mechanisms designed to break down native identity in indigenous youth, the BIA imposed a “blood purity” test to authenticate genuine Indians from others — a white-dominant world measuring the authenticity of a subjugated non-white world.
              </p>

              <p>
                It is no coincidence that at this moment in England, Charles Darwin's cousin Francis Galton was proposing the scientific improvement of humanity by means of selective breeding. This pseudo-science manipulation of Darwin's understanding of adaptation became known as Eugenics, and spread from England into the United States, where it provided the justification for state-sponsored discrimination. The BIA, attempting to eliminate an “Indian Problem” by pressing blood purity upon a native population, believed they had found a way to slowly eliminate Indigene through assimilation — dividing the “pure bloods” from the lesser pure bloods.
              </p>

              <p>
                The other native population on the continent, recently “freed” from bondage — the formerly enslaved African — was likewise subject to the American Eugenics movement, an ideology that would eventually feed the rise of Nazi Germany's genocide. This work recovers much of the lost and whitewashed history that tells the true story of our complex diversity. <em>African Village on Native Land</em> speaks to the infusion of indigenous cultures from two continents, sustaining a body of traditional knowledge that may yet prove vital to the survival of the human species.
              </p>

              <div className="callout-rule">
                This research forms the foundation for curriculum development — for both American schools, in the recovery of absent history, and for Angolan schools, in the encounter with African knowledge systems carried across the Atlantic.
              </div>

              <blockquote>
                The intertribal culture of African and Native American peoples — Katz's “Black Indians” — is not a footnote of American history. It is one of its primary chapters.
                <cite>— After William Loren Katz</cite>
              </blockquote>

              <Reveal as="div" className="journal-strip">
                <figure>
                  <img src="/images/07-turtle-journal.png" alt="Journal drawing of Turtle Island, from Dr. Stead's field journals" loading="lazy" decoding="async" />
                  <figcaption>“Mozelle Van Dunk Stein spoke of Turtle Island and its place in the bible.” — From Dr. Stead's journals.</figcaption>
                </figure>
                <figure>
                  <img src="/images/08-butterfly-journal.png" alt="Journal drawing of butterfly, from Dr. Stead's field journals" loading="lazy" decoding="async" />
                  <figcaption>“Cindy spoke of how Butterfly says, ‘You can't help but change.’” — From Dr. Stead's journals.</figcaption>
                </figure>
              </Reveal>
            </Reveal>

            <Reveal as="aside" className="sidebar-card">
              <p className="eyebrow">Source Document</p>
              <h4 style={{ marginTop: "0.4rem", marginBottom: "0.8rem", fontFamily: "var(--serif-display)", fontSize: "1.25rem", fontWeight: 500 }}>
                The Wangomend Map
              </h4>
              <figure>
                <img src="/images/06-wangomend-map.png" alt="Symbolic map drawn by Wangomend, an 18th-century Munsee Lenape prophet" loading="lazy" decoding="async" />
                <figcaption>
                  Map drawn by Wangomend, a Munsee (Lenape) prophet critical of white enslavement of African people. He preached that the afterlife was happiest for the Indians and the Negroes — each having their own heavens — but the whites would suffer in theirs for murdering and enslaving the Africans. <em>(The Lenape Delaware Indian Heritage: 10,000 B.C. – A.D. 2000, by Herbert C. Kraft, 2001.)</em>
                </figcaption>
              </figure>

              <hr className="rule" />

              <p className="eyebrow">From the Field</p>
              <figure style={{ marginTop: "0.8rem" }}>
                <img src="/images/01-beads.png" alt="Glass beads from Igbo-Olokun, Ile-Ife, southwestern Nigeria" loading="lazy" decoding="async" />
                <figcaption>Local glass production at Igbo-Olokun, ancient Yoruba city of Ile-Ife, southwestern Nigeria. Beads found at the Igbo-Olokun site.</figcaption>
              </figure>
              <figure style={{ marginTop: "1rem" }}>
                <img src="/images/02-iron-spear.png" alt="Four-pronged iron eel spear" loading="lazy" decoding="async" />
                <figcaption>Four-pronged iron eel spear, Blandana Bayard 1700s trading post site, Mahwah NJ.</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== LIVING HISTORY ===================== */}
      <section id="philosophy">
        <div className="wrap-narrow">
          <Reveal as="header" className="section-head">
            <p className="eyebrow"><span className="num">§ 02</span> Methodology</p>
            <h2>Living History</h2>
          </Reveal>

          <Reveal>
            <p className="lead">
              Cultural preservation through the art of storytelling: eldership and medicine stories honored among native society as a counter to the colonialism of the material world.
            </p>

            <p>
              An indigenous belief likely universal among the native world is this: <em>a story lives in the telling of the story.</em> The process of telling and listening brings teller and listener together into a living narrative that transcends time. Working with the premise that we are the history of our past — our past viewed always from our present lives, within the present from where it is spoken — we are forever weaving ourselves into the fabric of our traditions, our failures, and our reemergence.
            </p>

            <p>
              When the world of the nation/state sought resources from the nativistic world, the core principle of naturalism — reciprocity — was smashed and replaced with the principle of commodity. The remnants of that collision of colonialism have long been held together with the narrative thread of <em>medicine stories</em>: lasting tales infused with traditional knowledge, often sustained in metaphor, but not the lifeless symbol on a page. Rather, a living metaphor that breathes with every new teller, every new listener.
            </p>

            <p>
              And just as Arthur Frank told us in <em>The Wounded Storyteller</em> — that one can only heal by telling one's story through the wounds — medicine stories return the gift of reciprocation to our world. Exchange, acknowledgement, and inclusion are the virtues of medicine stories, and by these virtues one comes to speak truth to power. Such storytelling is living history — ever alive and alert to its own shape-shifting reality, ever conscious of its ancient presence in its untold future, and always building upon the sound of reflection.
            </p>

            <blockquote>
              A story lives in the telling of the story.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ===================== BIOGRAPHY ===================== */}
      <section id="bio">
        <div className="wrap">
          <Reveal as="header" className="section-head">
            <p className="eyebrow"><span className="num">§ 03</span> About</p>
            <h2>Dr. Chuck (Walter) Stead</h2>
          </Reveal>

          <div className="bio-grid">
            <Reveal>
              <p className="lead">
                A lifelong storyteller, Dr. Stead's work centers on Traditional Ecological Knowledge (TEK) and its integration with contemporary Western culture through storytelling. His informal education has been an association with countless tribal elders, social activists, veterans, citizen scientists, and storytellers.
              </p>
              <p>
                He has worked as a planning program assistant and environmental consultant to the Town of Ramapo, New York, and with Cornell Cooperative Extension at Stony Point, NY, as an environmental educator and county agent.
              </p>

              <div className="degrees">
                <p className="eyebrow">Formal Education</p>
                <ul>
                  <li>PhD, Environmental Studies — Antioch University, Keene, NH</li>
                  <li>Advanced Study in Social Ecology — Goddard College, Plainfield, VT</li>
                  <li>MA, Social / Public Policy — Empire State College, NY</li>
                  <li>BA — Empire State College, NY</li>
                  <li>AA — Rockland Community College, NY</li>
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <p className="eyebrow">Teaching Appointments</p>
              <ul className="cv-list">
                <li>
                  <span className="role">1998 – Pres.</span>
                  <span className="what"><strong>Ramapo College of New Jersey</strong> — Adjunct Professor. <em>World Sustainability</em>, <em>Social Ecology</em>, and a series of Environmental Studies courses.</span>
                </li>
                <li>
                  <span className="role">Montana</span>
                  <span className="what"><strong>Montana State University–Billings</strong> — <em>Native Americans in Contemporary Society.</em></span>
                </li>
                <li>
                  <span className="role">NYC</span>
                  <span className="what"><strong>Marymount Manhattan</strong> — Lecture / lab in <em>Environmental Science</em> and <em>Natural Disasters and the Environment.</em></span>
                </li>
                <li>
                  <span className="role">New York</span>
                  <span className="what"><strong>Empire State College of NY</strong> — Course development in <em>Social Policy</em>, <em>Community and Society</em>, and <em>Social Ecology.</em></span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== FIELD PROJECTS ===================== */}
      <section id="projects">
        <div className="wrap">
          <Reveal as="header" className="section-head">
            <p className="eyebrow"><span className="num">§ 04</span> Current Field Projects</p>
            <h2>Nine sites under active study.</h2>
            <p className="lead" style={{ maxWidth: "55ch", marginTop: "1.2rem" }}>
              From rock shelters and segregated schoolhouses to ironworker's homes and putative Underground Railroad way-stations, each site is being documented, surveyed, and woven back into the regional historical record.
            </p>
          </Reveal>

          <div className="proj-grid">
            {PROJECTS.map((p) => (
              <Reveal key={p.num} as="article" className="proj">
                <div className={`proj-media${p.images.length === 2 ? " split" : p.images.length === 3 ? " triple" : ""}`}>
                  {p.images.length > 0 ? (
                    p.images.map((im) => (
                      <img key={im.src} src={im.src} alt={im.cap} loading="lazy" decoding="async" />
                    ))
                  ) : (
                    <div className="ph">Image — coming soon</div>
                  )}
                </div>
                {p.images.length > 0 && (
                  <p className="proj-cap">
                    {p.images.map((im, i) => (
                      <span key={im.src}>
                        {im.cap}{i < p.images.length - 1 ? " · " : ""}
                      </span>
                    ))}
                  </p>
                )}
                <div className="proj-body">
                  <span className="proj-num">Site № {p.num}</span>
                  <h3 className="proj-title">{p.title}</h3>
                  <div className="proj-loc">{p.loc}</div>
                  <p className="proj-desc">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ANGOLA ===================== */}
      <section id="angola" className="angola">
        <div className="wrap">
          <Reveal as="header" className="section-head">
            <p className="eyebrow"><span className="num">§ 05</span> International Curriculum</p>
            <h2>Angola &amp; <em>the Atlantic Memory.</em></h2>
            <p className="lead" style={{ maxWidth: "55ch", marginTop: "1.2rem" }}>
              The story of Black Indians is a story of two continents. Half of it lives in the soils of the Hudson Valley and the Ramapo Mountains. The other half lives in the soils of West Central Africa — and nowhere more clearly than in Angola.
            </p>
          </Reveal>

          <Reveal>
            <p>
              We are actively seeking partnerships with Angolan schools, universities, and cultural institutions to develop a shared curriculum on indigenous knowledge systems, the African diaspora as historical agency, and the living continuity of traditional ecological wisdom across the Atlantic.
            </p>
            <p>
              For Angolan students, this curriculum is an opportunity to encounter the African diaspora not as victims of history, but as <em>agents</em> of culture — peoples who carried medicine stories, agricultural knowledge, metallurgical skill, spiritual practice, and political memory into the Americas, and who fused them with Native American traditions to build entirely new intertribal worlds. For American students, it is the recovery of an absent history — the histories that the BIA's “blood purity” laws and the eugenics movement actively erased.
            </p>

            <div className="grid">
              <div className="pillar">
                <h3>For Angolan Schools</h3>
                <p>An encounter with African knowledge systems carried across the Atlantic and with the descendants who keep them alive — recovering pride of authorship in the broader story of the Americas.</p>
              </div>
              <div className="pillar">
                <h3>For American Schools</h3>
                <p>The whitewashed history made visible: the BIA, eugenics, Underground Railroad geography, Black Indian intertribal culture, and the field evidence that proves the official narrative incomplete.</p>
              </div>
              <div className="pillar">
                <h3>Field Exchanges</h3>
                <p>Reciprocal field study at active research sites in NY/NJ and at significant sites in Angola — coordinated with local tribal councils, scholars, and cultural ministries.</p>
              </div>
              <div className="pillar">
                <h3>Living History Methodology</h3>
                <p>Storytelling as primary pedagogy — the elder, the listener, the medicine story — taught alongside archaeological method as complementary, not competing, disciplines.</p>
              </div>
            </div>

            <div className="cta-row">
              <a className="btn btn-primary" href="#contact">Inquire About Collaboration</a>
              <a className="btn btn-ghost" href="#engage">Engagement Options</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== VIDEOS ===================== */}
      <section id="videos">
        <div className="wrap">
          <Reveal as="header" className="section-head">
            <p className="eyebrow"><span className="num">§ 06</span> Video Archive</p>
            <h2>Articles, Interviews, &amp; Field Footage.</h2>
            <p className="lead" style={{ maxWidth: "55ch", marginTop: "1.2rem" }}>
              A growing collection of research materials and interviews with historians, community members, educators, and students.
            </p>
          </Reveal>

          <Reveal as="div" className="video-grid">
            {VIDEOS.map((v, i) => (
              <a key={i} className="video-card" href="#contact" aria-label={`${v.lab} — ${v.ttl}`}>
                <span className="play" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <div className="meta">
                  <div className="lab">{v.lab}</div>
                  <div className="ttl">{v.ttl}</div>
                </div>
              </a>
            ))}
          </Reveal>

          <div className="video-foot">
            <p className="note">New videos are added regularly. More content coming.</p>
            <div className="social-row">
              <a href="#" aria-label="YouTube">YouTube</a>
              <a href="#" aria-label="Facebook">Facebook</a>
              <a href="#" aria-label="Instagram">Instagram</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ENGAGEMENT ===================== */}
      <section id="engage">
        <div className="wrap">
          <Reveal as="header" className="section-head">
            <p className="eyebrow"><span className="num">§ 07</span> Field Trips &amp; Academic Engagement</p>
            <h2>Six ways to work together.</h2>
            <p className="lead" style={{ maxWidth: "55ch", marginTop: "1.2rem" }}>
              Reach out to discuss any of the following — Dr. Stead works directly with schools, scholars, civic organizations, tribal councils, and cultural institutions across the United States and abroad.
            </p>
          </Reveal>
          <Reveal as="div" className="eng-grid">
            {ENGAGEMENTS.map((e) => (
              <article key={e.num} className="eng-card">
                <div className="num">{e.num}.</div>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact">
        <div className="wrap">
          <Reveal as="header" className="section-head">
            <p className="eyebrow"><span className="num">§ 08</span> Get in Touch</p>
            <h2>Lectures, workshops, field trips.</h2>
          </Reveal>

          <div className="contact-grid">
            <Reveal as="div" className="contact-meta">
              <p className="lead">
                Dr. Stead personally reads and responds to academic and research inquiries — for lectures, field trips, curriculum development, or international partnership in Angola and the broader African continent.
              </p>
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd><a href="mailto:chuckstead@gmail.com">chuckstead@gmail.com</a></dd>
                </div>
                <div>
                  <dt>Affiliation</dt>
                  <dd>Ramapo College of New Jersey</dd>
                </div>
                <div>
                  <dt>Region</dt>
                  <dd>Hudson Valley &amp; Ramapo Mountains, NY / NJ</dd>
                </div>
                <div>
                  <dt>International Focus</dt>
                  <dd>Angola &amp; West Africa</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="foot">
        <div className="wrap">
          <div className="brand">Dr. Chuck Stead — Eco Historian</div>
          <div>
            <a href="mailto:chuckstead@gmail.com">chuckstead@gmail.com</a>
          </div>
          <div>© {new Date().getFullYear()} · All research and photography rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
