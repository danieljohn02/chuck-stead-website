import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import VideoGrid from "@/components/VideoGrid";
import { fetchPlaylistVideos, type Video } from "@/lib/youtube";

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
      { src: "/images/24-excavation-measuring.png", cap: "Measuring the excavation units at Spring House Rock Shelter" },
      { src: "/images/26-projectile-points.png", cap: "Projectile points: temporal indicators of Native American cultural periods" },
    ],
  },
];

// Used when YOUTUBE_API_KEY / YOUTUBE_PLAYLIST_ID env vars are not set,
// or until the videos are uploaded to YouTube. Replace `id` values with the
// 11-char YouTube video IDs (the bit after `v=` in a YouTube URL).
const FALLBACK_VIDEOS: Video[] = [
  { id: "", label: "Field Report", title: "Monsey Glen — Intro",            thumbnail: "", publishedAt: "" },
  { id: "", label: "Field Report", title: "Black Bridge",                    thumbnail: "", publishedAt: "" },
  { id: "", label: "Field Report", title: "Brook Street School",             thumbnail: "", publishedAt: "" },
  { id: "", label: "Field Report", title: "Cellar Kitchen — Harmony Hall",  thumbnail: "", publishedAt: "" },
  { id: "", label: "Field Report", title: "Indian Rock",                     thumbnail: "", publishedAt: "" },
  { id: "", label: "Field Report", title: "Augusta Forge",                   thumbnail: "", publishedAt: "" },
  { id: "", label: "Field Report", title: "Southfield Furnace",              thumbnail: "", publishedAt: "" },
  { id: "", label: "Field Report", title: "Piermont / Ramapo Rail Trail",    thumbnail: "", publishedAt: "" },
  { id: "", label: "Field Report", title: "Ramapo Pass",                     thumbnail: "", publishedAt: "" },
  { id: "", label: "Field Report", title: "Slave Ship",                      thumbnail: "", publishedAt: "" },
];

const ENGAGEMENTS = [
  { num: "I",   title: "Guided Field Trips",          body: "Active research sites in the Hudson Valley and Ramapo Mountains, available to schools, colleges, and civic organizations." },
  { num: "II",  title: "Lectures & Workshops",         body: "Traditional Ecological Knowledge, the African–Indigenous convergence, Eugenics and blood-purity laws, the Underground Railroad, and Living History methodology." },
  { num: "III", title: "Curriculum Consultation",      body: "K–12 and higher education in the United States and Angola — recovery of absent histories and the integration of indigenous knowledge systems." },
  { num: "IV",  title: "Research Collaboration",       body: "Archaeologists, folklorists, historians, and community scholars — field work, site assessment, and co-authorship." },
  { num: "V",   title: "Community Programs",           body: "Living History programming for cultural centers, tribal councils, churches, and community organizations." },
  { num: "VI",  title: "International Partnerships",   body: "Angola and the broader African continent — educational exchanges rooted in shared indigenous heritage and diaspora memory." },
];

export default async function Page() {
  const live = await fetchPlaylistVideos();
  const videos = live && live.length > 0 ? live : FALLBACK_VIDEOS;
  return (
    <>
      <Nav />

      {/* ===================== HERO ===================== */}
      <section id="hero" className="hero">
        <div className="wrap">
          <div className="hero-content">
            <div className="hero-grid">
              <div className="hero-main">
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
                <figure className="hero-portrait">
                  <img
                    src="/images/27-stead-portrait.png"
                    alt="Dr. Chuck Stead, photographed atop a ridge overlooking the Hudson Valley"
                    loading="eager"
                    decoding="async"
                  />
                  <figcaption>
                    Eco History is the study of the interplay between ecological and historical factors. It looks at how the environment changes; how human activities affect historical events and societal development.
                  </figcaption>
                </figure>
              </aside>
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
                  <div className="img-frame">
                    <img src="/images/07-turtle-journal.png" alt="Journal drawing of Turtle Island, from Dr. Stead's field journals" loading="lazy" decoding="async" />
                  </div>
                  <figcaption>“Mozelle Van Dunk Stein spoke of Turtle Island and its place in the bible.” — From Dr. Stead's journals.</figcaption>
                </figure>
                <figure>
                  <div className="img-frame">
                    <img src="/images/08-butterfly-journal.png" alt="Journal drawing of butterfly, from Dr. Stead's field journals" loading="lazy" decoding="async" />
                  </div>
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
        <div className="wrap">
          <Reveal as="header" className="section-head">
            <p className="eyebrow"><span className="num">§ 02</span> Methodology</p>
            <h2>Living History</h2>
          </Reveal>

          <div className="living-grid">
            <Reveal as="div" className="living-photos">
              <figure>
                <img
                  src="/images/28-stead-hat.png"
                  alt="Dr. Chuck Stead at a community gathering"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Dr. Stead at Nyack Farmer's Market, 2019.</figcaption>
              </figure>
              <figure>
                <img
                  src="/images/29-stead-storytelling.png"
                  alt="Dr. Stead speaking to a circle of children, telling stories"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>At Nature Place Day Camp, Chestnut Ridge, NY, 2013.</figcaption>
              </figure>
            </Reveal>

            <Reveal as="div" className="living-text">
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
        </div>
      </section>

      {/* ===================== BIOGRAPHY ===================== */}
      <section id="bio">
        <div className="wrap">
          <div className="bio-layout">
            <div className="bio-left">
              <Reveal as="header" className="section-head">
                <p className="eyebrow"><span className="num">§ 03</span> About</p>
                <h2>Dr. Chuck Stead</h2>
              </Reveal>
              <Reveal>
                <p className="lead">
                  A lifelong storyteller, Dr. Stead's work centers on Traditional Ecological Knowledge (TEK) and its integration with contemporary Western culture through storytelling. His informal education has been an association with countless tribal elders, social activists, veterans, citizen scientists, and storytellers.
                </p>
                <p>
                  He has worked as a planning program assistant and environmental consultant to the Town of Ramapo, New York; with Cornell Cooperative Extension at Stony Point, NY, as an environmental educator/county agent; and was lead investigator on the Ford Remediation project in the Ramapo Watershed, completed in 2018. Dr. Stead holds a PhD in Environmental Studies (Antioch University, Keene, NH); completed Advanced study in Social Ecology (Institute of Social Ecology, Goddard College, Plainfield, VT); and an MA in Social/Public Policy (Empire State College, NY).
                </p>
              </Reveal>
            </div>

            <Reveal as="div" className="bio-photos">
              <figure>
                <img
                  src="/images/30-piermont-pier.png"
                  alt="Dr. Stead with community partners at a Hudson River health outreach event"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Dept. of Health, Fish Advisory, at Piermont Pier, N.Y., 2011.</figcaption>
              </figure>
              <figure>
                <img
                  src="/images/31-cornell-extension.png"
                  alt="Dr. Stead conducting a field lesson with students"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Teaching field class for Cornell Cooperative Extension, 2011.</figcaption>
              </figure>
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

      {/* ===================== ECOLOGICAL RESTORATION ===================== */}
      <section id="restoration">
        <div className="wrap">
          <Reveal as="header" className="section-head">
            <p className="eyebrow"><span className="num">§ 05</span> Ecological Restoration</p>
            <h2>Twenty-three years in the Ramapo Watershed.</h2>
          </Reveal>

          <div className="two-col">
            <Reveal>
              <p className="lead">
                For a twenty-three-year period Dr. Stead worked on the restoration of environmental contamination sites on the New York side of the Ramapo Valley. These sites included The Meadows of Hillburn, NY; the Ramapo Wellfield in Hillburn; the Torne Valley of unincorporated Ramapo; and a series of adjacent sites.
              </p>
              <p>
                From discovery, documentation, soil analysis, and waste evaluation, Stead — working with Town Supervisor Christopher St. Lawrence — convinced the NYS DEC to open negotiations with Ford Motor Company, the party responsible for the disposal of the materials. The waste was primarily the lead paint finishes for cars manufactured in the Ford Mahwah Plant from 1955 to 1980.
              </p>
              <p>
                Dr. Stead's work in the watershed ultimately led to the cleanup and restoration of <em>over one hundred thousand tons of toxic waste.</em> His restoration work with the Department of Environmental Conservation, Ford Motor Company, the Town of Ramapo, herpetologists, botanists, and local indigenous survivors of the contamination was completed in 2018.
              </p>

              <blockquote>
                Over 100,000 tons of toxic waste removed from the watershed.
                <cite>— Completed 2018</cite>
              </blockquote>
            </Reveal>

            <Reveal as="aside" className="sidebar-card">
              <p className="eyebrow">Partners &amp; Counterparties</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0.8rem 0 0", fontSize: "0.95rem", lineHeight: 1.7 }}>
                <li>— NYS Department of Environmental Conservation</li>
                <li>— Ford Motor Company</li>
                <li>— Town of Ramapo, NY (Supervisor Christopher St. Lawrence)</li>
                <li>— Field herpetologists &amp; botanists</li>
                <li>— Local indigenous survivors of the contamination</li>
              </ul>
              <hr className="rule" />
              <p className="eyebrow">Sites</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0.8rem 0 0", fontSize: "0.95rem", lineHeight: 1.7 }}>
                <li>— The Meadows of Hillburn, NY</li>
                <li>— Ramapo Wellfield, Hillburn</li>
                <li>— Torne Valley, unincorporated Ramapo</li>
                <li>— Adjacent watershed sites</li>
              </ul>
            </Reveal>
          </div>

          <div className="restoration-gallery">
            <Reveal as="figure">
              <img src="/images/32-eco-deep-soil.jpg" alt="Deep soil samples" loading="lazy" decoding="async" />
              <figcaption>Deep soil samples.</figcaption>
            </Reveal>
            <Reveal as="figure">
              <img src="/images/33-eco-toxic-waste.jpg" alt="A buried continuous flow of toxic waste" loading="lazy" decoding="async" />
              <figcaption>A buried continuous flow of toxic waste.</figcaption>
            </Reveal>
            <Reveal as="figure">
              <img src="/images/34-eco-surface-soil.jpg" alt="Surface soil samples" loading="lazy" decoding="async" />
              <figcaption>Surface soil samples.</figcaption>
            </Reveal>
            <Reveal as="figure">
              <img src="/images/35-eco-lab-study.jpg" alt="Laboratory study of soil" loading="lazy" decoding="async" />
              <figcaption>Laboratory study of soil.</figcaption>
            </Reveal>
            <Reveal as="figure" className="restoration-pair">
              <div className="pair">
                <img src="/images/36-eco-tree-coring.jpg" alt="Dr. Stead coring tree rings" loading="lazy" decoding="async" />
                <img src="/images/37-eco-tree-rings.jpg" alt="Tree rings recovered by coring" loading="lazy" decoding="async" />
              </div>
              <figcaption>Dr. Stead coring tree rings to establish a timeline for the illegal dumping.</figcaption>
            </Reveal>
            <Reveal as="figure">
              <img src="/images/38-eco-ford-dec.jpg" alt="Dr. Stead talking with Ford and DEC representatives" loading="lazy" decoding="async" />
              <figcaption>Dr. Stead talking with Ford and DEC.</figcaption>
            </Reveal>
            <Reveal as="figure">
              <img src="/images/39-eco-flora-journal.jpg" alt="Field journal: plant studies of local flora" loading="lazy" decoding="async" />
              <figcaption>Plant studies of local flora.</figcaption>
            </Reveal>
            <Reveal as="figure">
              <img src="/images/40-eco-excavation.jpg" alt="Excavation work at contaminated site" loading="lazy" decoding="async" />
              <figcaption>Excavation work at contaminated site.</figcaption>
            </Reveal>
            <Reveal as="figure">
              <img src="/images/41-eco-predators.jpg" alt="Tracking key predators at the restoration site" loading="lazy" decoding="async" />
              <figcaption>Tracking key predators at site.</figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== ANGOLA ===================== */}
      <section id="angola" className="angola">
        <div className="wrap">
          <Reveal as="header" className="section-head angola-head">
            <div className="angola-head-text">
              <p className="eyebrow"><span className="num">§ 06</span> International Curriculum</p>
              <h2>Angola &amp; <em>the Atlantic Memory.</em></h2>
              <p className="lead" style={{ maxWidth: "55ch", marginTop: "1.2rem" }}>
                The story of Black Indians is a story of two continents. Half of it lives in the soils of the Hudson Valley and the Ramapo Mountains. The other half lives in the soils of West Central Africa — and nowhere more clearly than in Angola.
              </p>
            </div>
            <figure className="angola-head-photo">
              <img src="/images/47-angola-section.png" alt="Field journal: Jennings Petroglyph (New Jersey) and Angolan figurines, late 19th century" loading="lazy" decoding="async" />
              <figcaption>Prehistoric Petroglyph, New Jersey, and Angolan figurines, late 19th century. — <em>Stead's Angola Journal, 2026.</em></figcaption>
            </figure>
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
                <p>Reciprocal field study at active research sites in NY/NJ and at significant sites in Angola — coordinated with tribal councils, scholars, and cultural ministries.</p>
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
            <p className="eyebrow"><span className="num">§ 07</span> Video Archive</p>
            <h2>Articles, Interviews, &amp; Field Footage.</h2>
            <p className="lead" style={{ maxWidth: "55ch", marginTop: "1.2rem" }}>
              A growing collection of research materials and interviews with historians, community members, educators, and students.
            </p>
          </Reveal>

          <Reveal>
            <VideoGrid videos={videos} />
          </Reveal>

          <div className="video-foot">
            <p className="note">New videos are added regularly. More content coming.</p>
            <div className="social-row">
              <a href="https://www.youtube.com/@drcstead" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YouTube</a>
              <a href="https://www.facebook.com/chuck.stead.5" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
              <a href="https://www.instagram.com/steadchuck/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== ENGAGEMENT ===================== */}
      <section id="engage">
        <div className="wrap">
          <Reveal as="header" className="section-head">
            <p className="eyebrow"><span className="num">§ 08</span> Field Trips &amp; Academic Engagement</p>
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
            <p className="eyebrow"><span className="num">§ 09</span> Get in Touch</p>
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
                  <dt>Follow</dt>
                  <dd className="contact-socials">
                    <a href="https://www.facebook.com/chuck.stead.5" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.52l.38-2.93h-2.9V8.7c0-.85.24-1.43 1.46-1.43h1.56V4.66c-.27-.04-1.2-.12-2.28-.12-2.25 0-3.79 1.37-3.79 3.9v2.17H8v2.93h2.45V21h3.05z"/></svg>
                      <span>Facebook</span>
                    </a>
                    <a href="https://www.instagram.com/steadchuck/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>
                      <span>Instagram</span>
                    </a>
                    <a href="https://www.youtube.com/@drcstead" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z"/></svg>
                      <span>YouTube</span>
                    </a>
                  </dd>
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

          {/* Hidden static form for Netlify build-time form detection.
              The real form is rendered by ContactForm (client component).
              Netlify scans this at deploy time and registers the field names. */}
          <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
            <input type="text" name="firstName" />
            <input type="text" name="lastName" />
            <input type="email" name="email" />
            <input type="text" name="institution" />
            <input type="text" name="inquiry" />
            <input type="text" name="country" />
            <textarea name="message"></textarea>
            <input type="text" name="bot-field" />
          </form>
        </div>
      </section>

      {/* ===================== GALLERY ===================== */}
      <section id="gallery">
        <div className="wrap">
          <Reveal as="header" className="section-head">
            <p className="eyebrow"><span className="num">§ 10</span> Gallery</p>
            <h2>Photographs from the field.</h2>
            <p className="lead" style={{ maxWidth: "55ch", marginTop: "1.2rem" }}>
              A selection of images from research sites, community gatherings, and field expeditions.
            </p>
          </Reveal>

          <div className="gallery-masonry">
            {[
              { n: 1,  cap: "Dr. Stead with Leo, atop Mt. Peter, Orange County, NY, 2025." },
              { n: 2,  cap: "Dr. Stead at a Ramapo College Forum speaking out about the exploitation of the local Munsee tribe, 2013." },
              { n: 3,  cap: "Storytelling Festival, Haverstraw, NY, 2015." },
              { n: 4,  cap: "Dr. Stead at the Medicine Garden, Torne Valley, NY, 2014." },
              { n: 5,  cap: "Planting with wife Kat at Medicine Garden, 2014." },
              { n: 6,  cap: "Doctoral Defense, Ramapo Town Hall, 2015." },
              { n: 7,  cap: "Fleshing hides at Saltbox, 2016." },
              { n: 8,  cap: "Working with ethnobotanist Daniel Shebitz at Medicine Garden, 2016." },
              { n: 9,  cap: "Dr. Stead with Ramapo students, in the Torne Valley, Fall 2017." },
              { n: 10, cap: "Chunk of lead paint at Torne Valley site, 2017." },
              { n: 11, cap: "Dr. Stead hosting Mahwah Environmental Volunteer Organization (MEVO) in the Torne Valley, 2018." },
              { n: 12, cap: "Dr. Stead with Rutgers students, Ringwood, NJ — charting their field study, 2018." },
              { n: 13, cap: "Dr. Stead with Federal EPA and NJDEP officials at Ringwood Mine Superfund site, October 2018." },
              { n: 14, cap: "Rattlesnake napping on barn timbers near Saltbox, 2018." },
              { n: 16, cap: "Dr. Stead introduced his colleague forager Paul Tappenden to Alicia Cook — Medicine Woman of the Akwesasne Mohawk Reservation — to further his study of Traditional Knowledge. January 2020." },
              { n: 17, cap: "Stead's Angola Journal, 2024." },
              { n: 18, cap: "Prehistoric Walls map, 1845, sketched into Angola Journal, 2024." },
              { n: 19, cap: "Speaking to Angolan guests at Harmony Hall, April 2025." },
              { n: 20, cap: "Speaking at Mandela Hall in the UN, NYC, April 2026." },
              { n: 21, cap: "Dr. Stead with H.E. Tete Antonio, Minister of External Relations of the Republic of Angola, at Harmony Hall, April 18, 2025." },
              { n: 22, cap: "H.E. Tete Antonio, Minister of External Relations of the Republic of Angola, with Sloatsburg Mayor Darrell Fraiser, Harmony Hall, April 18, 2025." },
              { n: 23, cap: "Joyce De Groat and Dolly De Groat with Dr. Stead at Harmony Hall, April 18, 2025." },
            ].map(({ n, cap }) => (
              <figure key={n} className="gallery-item">
                <img
                  src={`/images/gallery-${String(n).padStart(2, "0")}.jpg`}
                  alt={cap}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{cap}</figcaption>
              </figure>
            ))}
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
          <div className="foot-socials">
            <a href="https://www.facebook.com/chuck.stead.5" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.52l.38-2.93h-2.9V8.7c0-.85.24-1.43 1.46-1.43h1.56V4.66c-.27-.04-1.2-.12-2.28-.12-2.25 0-3.79 1.37-3.79 3.9v2.17H8v2.93h2.45V21h3.05z"/></svg>
              <span>Facebook</span>
            </a>
            <a href="https://www.instagram.com/steadchuck/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>
              <span>Instagram</span>
            </a>
            <a href="https://www.youtube.com/@drcstead" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z"/></svg>
              <span>YouTube</span>
            </a>
          </div>
          <div>© {new Date().getFullYear()} · All research and photography rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
