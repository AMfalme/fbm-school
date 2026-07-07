"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "../../../components/AdminSidebar";
import { db } from "../../../lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import Link from "next/link";

// Shared interfaces
interface MediaItem {
  id: string;
  ministrySlug: string;
  photoUrl: string;
  title: string;
  subtitle?: string;
  mediaType: "image" | "video";
  displayOrder: number;
}

// Stat item
interface StatItem {
  label: string;
  value: string;
}

// Gallery record (for bible-college, church-planting)
interface GalleryRecord {
  id: string;
  title: string;
  cohort: string;
  category: string;
  location: string;
  url: string;
  description: string;
  extendedSummary: string;
  deploymentImpact: string;
  stats: StatItem[];
  sliderImages: string[];
}

// Church plant (for church-planting)
interface ChurchPlant {
  id: string;
  name: string;
  region: string;
  status: "Completed" | "Under Construction" | "Planning Phase";
  pastor: string;
  foundedYear: string;
  featuredImage: string;
  vernacularLanguage: string;
  historicalContext: string;
  strategicLogistics: string;
  metrics: StatItem[];
  journalSlider: string[];
}

// Curriculum item
interface CurriculumItem {
  id: string;
  title: string;
  description: string;
  grade?: string;
}

// Timeline event
interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  color?: string;
  icon?: string;
}

// Academy tab content
interface AcademyTabContent {
  id: string;
  label: string;
  grades: string;
  items: CurriculumItem[];
}

// Activity item
interface ActivityItem {
  icon: string;
  name: string;
}

// Service item (hospital)
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  hours?: string;
  tags?: string;
  focus?: string;
}

// Outreach item
interface OutreachItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Admission step
interface AdmissionStep {
  id: string;
  step: string;
  title: string;
  description: string;
}

// Mission branch
interface MissionBranch {
  id: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const PAGE_CONFIGS: Record<string, { title: string; collection: string; publicUrl: string; icon: string }> = {
  "bible-college": { title: "Bible College", collection: "bible-college", publicUrl: "/bible-college", icon: "📜" },
  "church-planting": { title: "Church Planting", collection: "church-planting", publicUrl: "/church-planting", icon: "🌱" },
  "faith-academy": { title: "Christian Faith Academy", collection: "faith-academy", publicUrl: "/faith-academy", icon: "📖" },
  "christian-faith-academy": { title: "Christian Faith Academy", collection: "faith-academy", publicUrl: "/ministries/christian-faith-academy", icon: "📖" },
  "hospital-project": { title: "Hospital Project", collection: "hospital-project", publicUrl: "/hospital-project", icon: "🏥" },
  "missionary-outreach": { title: "Missionary Outreach", collection: "missionary-outreach", publicUrl: "/ministries/missionary-outreach", icon: "⚜️" },
};

// Fetch media library images for a given slug
async function fetchMediaLibrary(slug: string): Promise<MediaItem[]> {
  try {
    const q = query(
      collection(db, "ministry-media"),
      where("ministrySlug", "==", slug),
      orderBy("displayOrder", "asc")
    );
    const snapshot = await getDocs(q);
    const items: MediaItem[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.deleted) return;
      items.push({ id: doc.id, ...data } as MediaItem);
    });
    return items;
  } catch {
    return [];
  }
}

export default function AdminMinistryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const config = PAGE_CONFIGS[slug];

  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>(null);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [saved, setSaved] = useState(false);

  // Auth effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) { setIsAdmin(false); setLoading(false); return; }
      try {
        const userDocRef = doc(db, "users", u.uid);
        const snapshot = await getDoc(userDocRef);
        setIsAdmin(snapshot.exists() && snapshot.data()?.role === "admin");
      } catch { setIsAdmin(false); }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load page data
  useEffect(() => {
    if (!slug || !isAdmin) return;
    loadPageData();
    loadMedia();
  }, [slug, isAdmin]);

  const loadPageData = async () => {
    try {
      const docRef = doc(db, config.collection, "page-content");
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setData(snapshot.data());
      } else {
        // Initialize with default data structure from public page
        setData(getDefaultData(slug));
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setData(getDefaultData(slug));
    }
  };

  const loadMedia = async () => {
    setLoadingMedia(true);
    setMediaLibrary(await fetchMediaLibrary(slug));
    setLoadingMedia(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await setDoc(doc(db, config.collection, "page-content"), {
        ...data,
        updatedAt: serverTimestamp()
      }, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF9]">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="font-medium text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF9]">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="font-medium text-red-600">
            {!user ? "You must be signed in." : "Access denied."}
          </p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF9]">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="font-medium text-red-600">Unknown ministry: {slug}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminSidebar />
      <main className="ml-0 lg:ml-64 min-h-screen bg-[#F8FAFC] p-8 pt-20 lg:pt-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/admin/ministries" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                ← Back to Ministries
              </Link>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mt-2">{config.icon} {config.title} - Page Editor</h1>
            <p className="mt-1 text-sm text-slate-500">
              Edit the content of your public {config.title} page. Data saves to <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">{config.collection}/page-content</code> in Firestore.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={config.publicUrl}
              target="_blank"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              View Public Page ↗
            </a>
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-[#0055b8] px-6 py-2 text-sm font-bold text-white hover:bg-[#003d7a] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : saved ? "✅ Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        {!data ? (
          <div className="text-center py-12 text-slate-500">Loading page data...</div>
        ) : (
          <div className="space-y-8">
            {/* Render page-specific form */}
            {slug === "bible-college" && (
              <BibleCollegeForm data={data} onChange={setData} mediaLibrary={mediaLibrary} onRefreshMedia={loadMedia} />
            )}
            {slug === "church-planting" && (
              <ChurchPlantingForm data={data} onChange={setData} mediaLibrary={mediaLibrary} onRefreshMedia={loadMedia} />
            )}
            {slug === "faith-academy" && (
              <FaithAcademyForm data={data} onChange={setData} mediaLibrary={mediaLibrary} onRefreshMedia={loadMedia} />
            )}
            {slug === "hospital-project" && (
              <HospitalProjectForm data={data} onChange={setData} mediaLibrary={mediaLibrary} onRefreshMedia={loadMedia} />
            )}
            {slug === "missionary-outreach" && (
              <MissionOutreachForm data={data} onChange={setData} mediaLibrary={mediaLibrary} onRefreshMedia={loadMedia} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ===== DEFAULT DATA FACTORIES =====

function getDefaultData(slug: string): any {
  const defaults: Record<string, any> = {
    "bible-college": {
      title: "Training Native Pastors For Exponential Gospel Impact",
      subtitle: "Empowering and training local pastors and church leaders with solid biblical teaching, sound theology, and a deep knowledge of the Word of God so they can successfully reach their communities for Christ.",
      heroImage: "/bible-college/bible college.jpg",
      stats: [
        { label: "Credit Hours", value: "36" },
        { label: "Vernacular Mastery", value: "100%" },
        { label: "Field Hours", value: "400+" },
        { label: "Active Plants", value: "15+" }
      ],
      curriculumItems: [
        { id: "1", title: "Biblical Hermeneutics", description: "Training men to systematically unpack scripture using the literal, grammatical, historical method." },
        { id: "2", title: "Systematic Theology", description: "A complete study of standard core doctrines: Bibliology, Theology Proper, Christology, etc." },
        { id: "3", title: "Homiletics & Expository Drill", description: "Developing effective sermon structural clarity through intense practical preaching." },
        { id: "4", title: "Pastoral Epistles & Admin", description: "Foundational wisdom regarding local church management and discipline." },
        { id: "5", title: "Baptist History & Polity", description: "Traced documentation of historical fundamental beliefs." },
        { id: "6", title: "Missions & Church Planting", description: "Practical strategy for entering new fields and seeding local convert cells." }
      ],
      milestones: [
        { id: "1", date: "2025", title: "The 2025 Sovereign Grace Convocation", description: "Over 150 local leaders completed specialized field training.", color: "#0055b8" },
        { id: "2", date: "2024", title: "Inaugural Textual Library Expansion", description: "Established a sound theological research desk with commentary volumes.", color: "#16a34a" },
        { id: "3", date: "2023", title: "The Western Kenya Village Crusades", description: "Students traveled to remote communities, establishing 3 new local churches.", color: "#f59e0b" }
      ],
      galleryRecords: [
        {
          id: "rec-1",
          title: "Pastoral Ministry Commencement",
          cohort: "Class of 2024",
          category: "Ordination Track",
          location: "Central Campus Grounds",
          url: "/bible-college/bible college.jpg",
          description: "A high-moment showing our trained native ministers receiving their official theological commissions.",
          extendedSummary: "This milestone event marked the completion of our intensive 3-year pastoral module system.",
          deploymentImpact: "Graduates deployed into unreached pockets of Western and Coastal Kenya.",
          stats: [
            { label: "Ordained Ministers", value: "14 Men" },
            { label: "Hours in Practicum", value: "450 Hrs" },
            { label: "Target Villages", value: "6 Zones" },
            { label: "Initial Converts", value: "120+" }
          ],
          sliderImages: ["/bible-college/graduation.jpg", "/bible-college/bible college.jpg", "/bible-college/bible college 2.jpg"]
        }
      ]
    },
    "church-planting": {
      title: "Plant Self-Sustaining Independent Churches",
      subtitle: "Training local men and women to plant self-governing, self-supporting, and self-propagating churches.",
      heroImage: "/bible-college/mission bible college.png",
      stats: [
        { label: "Local Churches", value: "14+" },
        { label: "New Church Plants", value: "3" },
        { label: "Baptized Members", value: "300+" },
        { label: "Local Leadership", value: "100%" }
      ],
      process: [
        { id: "1", title: "Train Indigenous Leaders", description: "Equipping dedicated students at our Bible College with solid biblical knowledge.", icon: "01" },
        { id: "2", title: "Plant Local Churches", description: "Trained leaders establish independent Baptist churches in their own communities.", icon: "02" },
        { id: "3", title: "Multiply & Replicate", description: "Each new church becomes self-governing, self-supporting, and self-propagating.", icon: "03" }
      ],
      churchPlants: [
        {
          id: "plant-1",
          name: "Freedom Baptist Mission - Bible College",
          region: "Western Region (Kakamega)",
          status: "Completed",
          pastor: "Bishop Reverend Benard Curry (Class of 2023)",
          foundedYear: "2024",
          featuredImage: "/bible-college/mission bible college.png",
          vernacularLanguage: "Luhya / Swahili",
          historicalContext: "Training passionate local leaders to share the Gospel and establish healthy, independent churches.",
          strategicLogistics: "This training center equips pastors and evangelists with biblical knowledge and practical ministry skills.",
          metrics: [
            { label: "Church Family", value: "65 Members" },
            { label: "Weekly Worship", value: "110+" },
            { label: "Local Leaders", value: "2 Trained" },
            { label: "Self-Support", value: "85%" }
          ],
          journalSlider: ["/bible-college/bible class.jpeg", "/bible-college/bible college class.jpg", "/bible-college/mission bible college.png"]
        }
      ]
    },
    "faith-academy": {
      title: "Christian Faith Academy",
      subtitle: "Pre-Primary through Junior School - Foundational education from Pre-Primary to Junior School, integrating academic excellence with uncompromised biblical truth.",
      heroImage: "/school/classroom.png",
      highlights: [
        { icon: "📚", value: "CBC Compliant", desc: "Fully integrated competency-based pathways" },
        { icon: "🎓", value: "PP1 to Grade 9", desc: "Complete early-years to junior school track" },
        { icon: "✝️", value: "Christ-Centered", desc: "Scripture woven into every subject" },
        { icon: "🏠", value: "Nurturing Community", desc: "Safe environment for character formation" }
      ],
      whyChooseUs: [
        { icon: "🎯", title: "Academic Excellence", desc: "Rigorous CBC curriculum delivered by qualified educators." },
        { icon: "✝️", title: "Christian Values", desc: "Biblical worldview integrated across all subjects." },
        { icon: "👨‍🏫", title: "Qualified Teachers", desc: "Experienced Christian educators." },
        { icon: "🌱", title: "Holistic Development", desc: "Balanced focus on academic, spiritual, physical, and social development." },
        { icon: "🛡️", title: "Safe Environment", desc: "Secure, supportive campus." },
        { icon: "🤝", title: "Community Impact", desc: "Partnership with families." }
      ],
      curriculumTabs: [
        {
          id: "pre-primary",
          label: "Pre-Primary",
          grades: "Ages 4-6",
          items: [
            { id: "1", title: "Play-Based Learning", description: "Structured play activities that develop motor skills." },
            { id: "2", title: "Early Literacy", description: "Introduction to phonics and storytelling." },
            { id: "3", title: "Numeracy Basics", description: "Hands-on number recognition." },
            { id: "4", title: "Spiritual Foundation", description: "Bible stories and memory verses." }
          ]
        },
        {
          id: "lower-primary",
          label: "Lower Primary",
          grades: "Grades 1-3",
          items: [
            { id: "1", title: "Reading & Writing", description: "Transition from emergent reading to confident text engagement." },
            { id: "2", title: "Mathematics", description: "Building numerical fluency." },
            { id: "3", title: "Science & Environment", description: "Exploring God's creation." },
            { id: "4", title: "Social Studies", description: "Understanding community and culture." }
          ]
        }
      ],
      activities: [
        { icon: "⚽", name: "Football" }, { icon: "🎵", name: "Music" }, { icon: "🎭", name: "Drama" },
        { icon: "📚", name: "Bible Club" }, { icon: "🏕️", name: "Scouts" }, { icon: "🎤", name: "Debate" },
        { icon: "🎨", name: "Art & Craft" }, { icon: "👑", name: "Leadership" }
      ],
      academyImages: [
        { src: "/school/highlight.png", alt: "Safe and nurturing school environment" },
        { src: "/school/classroom.png", alt: "Students in active classroom learning" },
        { src: "/school/hi.png", alt: "Students playing and socializing outdoors" }
      ]
    },
    "hospital-project": {
      title: "Healing & Evangelism Through Medical Ministry",
      subtitle: "We utilize our healthcare services as a divine appointment to evangelize and share the life-changing Gospel.",
      heroImage: "/church/visit.jpg",
      stats: [
        { label: "24/7 Access", value: "24/7" },
        { label: "Modern Labs", value: "Advanced" },
        { label: "Faith-Driven", value: "Chaplaincy" },
        { label: "Mobile Clinics", value: "Active" }
      ],
      services: [
        { id: "1", title: "Outpatient & Triage", description: "We bring healthcare directly to rural communities through regular mobile medical camps.", hours: "24 Hours", tags: "Emergency", focus: "Rapid stabilizations & disease tracking" },
        { id: "2", title: "Maternity & Neonatal", description: "Comprehensive antenatal tracking, protective labor rooms, and baby immunization programs.", hours: "Specialized", tags: "Maternal Care", focus: "Child health and safe deliveries" },
        { id: "3", title: "Wards & Extended Pharmaceutical Care", description: "Well-ventilated recovery wards staffed by sensitive clinical nursing experts.", hours: "Inpatient", tags: "Recovery Units", focus: "Full pharmacy support" }
      ],
      outreachItems: [
        { id: "1", title: "Free Health Camp Outlines", description: "Deploying doctors, diagnostic toolsets, and free therapeutic prescriptions into marginalized neighborhoods quarterly.", icon: "🏕️" },
        { id: "2", title: "Counseling & Pastoral Integration", description: "Every clinical intervention is accompanied by trained chaplains offering deep prayer support.", icon: "🗣️" }
      ],
      admissionsProcess: [
        { id: "1", step: "Step 01", title: "Triage & Records", description: "Present government identification tokens, referral write-ups, or insurance verification." },
        { id: "2", step: "Step 02", title: "Clinical Assessment", description: "Undergo immediate preliminary checking by on-duty nursing officers." },
        { id: "3", step: "Step 03", title: "Care & Discharge Plan", description: "Receive expert treatment pipelines followed by a comprehensive discharge setup." }
      ]
    },
    "missionary-outreach": {
      title: "Go. Make Disciples. Plant Self-Sustaining Churches",
      subtitle: "We leave behind temporary aid to train local men and women to plant independent churches.",
      heroImage: "/church/academic.jpg",
      stats: [
        { label: "Christian Faith Academy", desc: "From Pre-Primary to Junior School with academic excellence rooted in biblical truth", color: "emerald" },
        { label: "Medical Mission Hospital", desc: "Healthcare as a divine appointment to share the Gospel", color: "blue" },
        { label: "Bible College", desc: "Equipping local pastors with solid biblical teaching", color: "amber" },
        { label: "Church Planting", desc: "Training indigenous leaders to plant self-sustaining churches", color: "purple" }
      ],
      branches: [
        { id: "1", title: "Christian Faith Academy", description: "Foundational education from Pre-Primary to Junior School integrating academic excellence with biblical truth.", link: "/faith-academy", linkText: "Explore Academy Hub Page" },
        { id: "2", title: "Medical Mission Hospital", description: "We utilize healthcare services as a divine appointment to evangelize and share the Gospel.", link: "/hospital-project", linkText: "Explore Hospital Registry Page" },
        { id: "3", title: "Bible College", description: "Empowering local pastors and church leaders with solid biblical teaching.", link: "/bible-college", linkText: "Explore Theological Programs" },
        { id: "4", title: "Church Planting", description: "Training local men and women to plant self-governing, self-supporting churches.", link: "/church-planting", linkText: "View Church Plants" }
      ]
    }
  };
  return defaults[slug] || {};
}

// ===== MEDIA IMAGE PICKER =====
function ImageSelector({ mediaLibrary, value, onChange, label }: { mediaLibrary: MediaItem[]; value: string; onChange: (url: string) => void; label: string }) {
  const [showPicker, setShowPicker] = useState(false);
  return (
    <div>
      <label className="block text-xs font-bold text-slate-700 mb-1">{label}</label>
      <div className="flex items-center gap-3">
        {value && (
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <img src={value} alt="Selected" className="w-full h-full object-cover" />
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or path"
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 font-medium focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20"
        />
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition-colors"
        >
          📁 Browse
        </button>
      </div>
      {showPicker && (
        <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl max-h-40 overflow-y-auto">
          <p className="text-xs font-bold text-slate-600 mb-2">Media Library for this ministry:</p>
          {mediaLibrary.length === 0 && <p className="text-xs text-slate-400">No media found. Upload via the Media button on the ministries list page.</p>}
          <div className="grid grid-cols-6 gap-2">
            {mediaLibrary.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { onChange(item.photoUrl); setShowPicker(false); }}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${value === item.photoUrl ? 'border-[#0055b8]' : 'border-transparent hover:border-slate-300'}`}
              >
                <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[8px] px-1 py-0.5 truncate">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== ARRAY ITEM HELPERS =====
function ArrayField({ items, onChange, renderItem, addLabel, onAdd }: {
  items: any[]; onChange: (items: any[]) => void; renderItem: (item: any, index: number, update: (v: any) => void, remove: () => void) => React.ReactNode;
  addLabel: string; onAdd: () => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const update = (newItem: any) => {
          const next = [...items];
          next[idx] = newItem;
          onChange(next);
        };
        const remove = () => onChange(items.filter((_, i) => i !== idx));
        return <div key={idx}>{renderItem(item, idx, update, remove)}</div>;
      })}
      <button type="button" onClick={onAdd} className="text-xs font-bold text-[#0055b8] hover:text-[#003d7a]">{addLabel}</button>
    </div>
  );
}

// ===== BIBLE COLLEGE FORM =====
function BibleCollegeForm({ data, onChange, mediaLibrary, onRefreshMedia }: {
  data: any; onChange: (d: any) => void; mediaLibrary: MediaItem[]; onRefreshMedia: () => void;
}) {
  const set = (path: string, value: any) => {
    const keys = path.split(".");
    const newData = { ...data };
    let obj: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      obj[keys[i]] = { ...obj[keys[i]] };
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Section title="Hero Section">
        <Field label="Page Title">
          <input type="text" value={data.title || ""} onChange={(e) => set("title", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20" />
        </Field>
        <Field label="Subtitle">
          <textarea rows={3} value={data.subtitle || ""} onChange={(e) => set("subtitle", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none focus:ring-2 focus:ring-[#0055b8]/20 resize-none" />
        </Field>
        <ImageSelector mediaLibrary={mediaLibrary} value={data.heroImage || ""} onChange={(v) => set("heroImage", v)} label="Hero Image" />
      </Section>

      {/* Stats */}
      <Section title="Statistics (4 columns)">
        <ArrayField
          items={data.stats || []}
          onChange={(v) => set("stats", v)}
          addLabel="+ Add Stat"
          onAdd={() => set("stats", [...(data.stats || []), { label: "", value: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="flex gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
              <input type="text" value={item.value} onChange={(e) => update({ ...item, value: e.target.value })}
                placeholder="Value (e.g. 36)" className="w-24 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <input type="text" value={item.label} onChange={(e) => update({ ...item, label: e.target.value })}
                placeholder="Label (e.g. Credit Hours)" className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <button onClick={remove} className="text-red-500 hover:text-red-700 p-1 text-xs">✕</button>
            </div>
          )}
        />
      </Section>

      {/* Curriculum Items */}
      <Section title="Curriculum / Core Areas of Training">
        <ArrayField
          items={data.curriculumItems || []}
          onChange={(v) => set("curriculumItems", v)}
          addLabel="+ Add Curriculum Item"
          onAdd={() => set("curriculumItems", [...(data.curriculumItems || []), { id: Date.now().toString(), title: "", description: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Item {idx + 1}</span>
                <button onClick={remove} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
              </div>
              <input type="text" value={item.title} onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <textarea rows={2} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })}
                placeholder="Description" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
            </div>
          )}
        />
      </Section>

      {/* Milestones / Timeline */}
      <Section title="Milestones / Timeline Events">
        <ArrayField
          items={data.milestones || []}
          onChange={(v) => set("milestones", v)}
          addLabel="+ Add Milestone"
          onAdd={() => set("milestones", [...(data.milestones || []), { id: Date.now().toString(), date: "", title: "", description: "", color: "#0055b8" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Event {idx + 1}</span>
                <button onClick={remove} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={item.date} onChange={(e) => update({ ...item, date: e.target.value })}
                  placeholder="Date/Year" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                <input type="text" value={item.color} onChange={(e) => update({ ...item, color: e.target.value })}
                  placeholder="Color hex" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              </div>
              <input type="text" value={item.title} onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <textarea rows={2} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })}
                placeholder="Description" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
            </div>
          )}
        />
      </Section>

      {/* Gallery Records */}
      <Section title="Gallery Records (Archive Entries)">
        <ArrayField
          items={data.galleryRecords || []}
          onChange={(v) => set("galleryRecords", v)}
          addLabel="+ Add Gallery Record"
          onAdd={() => set("galleryRecords", [...(data.galleryRecords || []), {
            id: Date.now().toString(), title: "", cohort: "", category: "", location: "", url: "", description: "", extendedSummary: "", deploymentImpact: "", stats: [], sliderImages: []
          }])}
          renderItem={(item, idx, update, remove) => (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Record {idx + 1}</span>
                <button onClick={remove} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                <input type="text" value={item.cohort} onChange={(e) => update({ ...item, cohort: e.target.value })} placeholder="Cohort (e.g. Class of 2024)" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={item.category} onChange={(e) => update({ ...item, category: e.target.value })} placeholder="Category" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                <input type="text" value={item.location} onChange={(e) => update({ ...item, location: e.target.value })} placeholder="Location" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              </div>
              <ImageSelector mediaLibrary={mediaLibrary} value={item.url} onChange={(v) => update({ ...item, url: v })} label="Featured Image" />
              <textarea rows={2} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })}
                placeholder="Short description" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
              <textarea rows={2} value={item.extendedSummary} onChange={(e) => update({ ...item, extendedSummary: e.target.value })}
                placeholder="Extended Summary" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
              <textarea rows={2} value={item.deploymentImpact} onChange={(e) => update({ ...item, deploymentImpact: e.target.value })}
                placeholder="Deployment Impact" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
              
              {/* Record Stats */}
              <div className="border-t border-slate-200 pt-2 mt-2">
                <p className="text-xs font-bold text-slate-600 mb-2">Stats for this record</p>
                <ArrayField
                  items={item.stats || []}
                  onChange={(v) => update({ ...item, stats: v })}
                  addLabel="+ Add Stat"
                  onAdd={() => update({ ...item, stats: [...(item.stats || []), { label: "", value: "" }] })}
                  renderItem={(stat, si, ustat, rstat) => (
                    <div className="flex gap-2 items-center">
                      <input type="text" value={stat.value} onChange={(e) => ustat({ ...stat, value: e.target.value })}
                        placeholder="Value" className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                      <input type="text" value={stat.label} onChange={(e) => ustat({ ...stat, label: e.target.value })}
                        placeholder="Label" className="flex-1 rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                      <button onClick={rstat} className="text-red-500 hover:text-red-700 text-xs">✕</button>
                    </div>
                  )}
                />
              </div>

              {/* Slider Images */}
              <div className="border-t border-slate-200 pt-2 mt-2">
                <p className="text-xs font-bold text-slate-600 mb-2">Slider Images (URLs)</p>
                <ArrayField
                  items={item.sliderImages || []}
                  onChange={(v) => update({ ...item, sliderImages: v })}
                  addLabel="+ Add Slider Image URL"
                  onAdd={() => update({ ...item, sliderImages: [...(item.sliderImages || []), ""] })}
                  renderItem={(img, ii, uimg, rimg) => (
                    <div className="flex gap-2 items-center">
                      <input type="text" value={img} onChange={(e) => uimg(e.target.value)}
                        placeholder="Image path" className="flex-1 rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                      <button onClick={rimg} className="text-red-500 hover:text-red-700 text-xs">✕</button>
                    </div>
                  )}
                />
              </div>
            </div>
          )}
        />
      </Section>
    </div>
  );
}

// ===== CHURCH PLANTING FORM =====
function ChurchPlantingForm({ data, onChange, mediaLibrary, onRefreshMedia }: { data: any; onChange: (d: any) => void; mediaLibrary: MediaItem[]; onRefreshMedia?: () => void }) {
  const set = (path: string, value: any) => {
    const keys = path.split(".");
    const newData = { ...data };
    let obj: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      obj[keys[i]] = { ...obj[keys[i]] };
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    onChange(newData);
  };
  return (
    <div className="space-y-6">
      <Section title="Hero Section">
        <Field label="Title"><input type="text" value={data.title || ""} onChange={(e) => set("title", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none focus:ring-2" /></Field>
        <Field label="Subtitle"><textarea rows={2} value={data.subtitle || ""} onChange={(e) => set("subtitle", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none focus:ring-2 resize-none" /></Field>
        <ImageSelector mediaLibrary={mediaLibrary} value={data.heroImage || ""} onChange={(v) => set("heroImage", v)} label="Hero Image" />
      </Section>
      <Section title="Statistics (4 columns)">
        <ArrayField items={data.stats || []} onChange={(v) => set("stats", v)} addLabel="+ Add Stat" onAdd={() => set("stats", [...(data.stats || []), { label: "", value: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="flex gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
              <input type="text" value={item.value} onChange={(e) => update({ ...item, value: e.target.value })} placeholder="Value" className="w-24 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <input type="text" value={item.label} onChange={(e) => update({ ...item, label: e.target.value })} placeholder="Label" className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <button onClick={remove} className="text-red-500 hover:text-red-700 p-1 text-xs">✕</button>
            </div>
          )}
        />
      </Section>
      <Section title="Process / How We Work">
        <ArrayField items={data.process || []} onChange={(v) => set("process", v)} addLabel="+ Add Step" onAdd={() => set("process", [...(data.process || []), { id: Date.now().toString(), title: "", description: "", icon: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between"><span className="text-xs font-bold text-slate-500">Step {idx + 1}</span><button onClick={remove} className="text-red-500 text-xs">Remove</button></div>
              <input type="text" value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <textarea rows={2} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
            </div>
          )}
        />
      </Section>
      <Section title="Church Plants">
        <p className="text-xs text-slate-500 mb-3">Individual church plant projects with metrics and images</p>
        <ArrayField items={data.churchPlants || []} onChange={(v) => set("churchPlants", v)} addLabel="+ Add Church Plant" onAdd={() => set("churchPlants", [...(data.churchPlants || []), { id: Date.now().toString(), name: "", region: "", status: "Planning Phase", pastor: "", foundedYear: "", featuredImage: "", vernacularLanguage: "", historicalContext: "", strategicLogistics: "", metrics: [], journalSlider: [] }])}
          renderItem={(item, idx, update, remove) => (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between"><span className="text-xs font-bold text-slate-500">Plant {idx + 1}</span><button onClick={remove} className="text-red-500 text-xs">Remove</button></div>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={item.name} onChange={(e) => update({ ...item, name: e.target.value })} placeholder="Name" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                <input type="text" value={item.region} onChange={(e) => update({ ...item, region: e.target.value })} placeholder="Region" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <select value={item.status} onChange={(e) => update({ ...item, status: e.target.value })} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none">
                  <option value="Completed">Completed</option><option value="Under Construction">Under Construction</option><option value="Planning Phase">Planning Phase</option>
                </select>
                <input type="text" value={item.pastor} onChange={(e) => update({ ...item, pastor: e.target.value })} placeholder="Pastor name" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                <input type="text" value={item.foundedYear} onChange={(e) => update({ ...item, foundedYear: e.target.value })} placeholder="Founded year" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              </div>
              <ImageSelector mediaLibrary={mediaLibrary} value={item.featuredImage} onChange={(v) => update({ ...item, featuredImage: v })} label="Featured Image" />
              <div className="grid grid-cols-2 gap-2">
                <textarea rows={2} value={item.historicalContext} onChange={(e) => update({ ...item, historicalContext: e.target.value })} placeholder="Historical Context" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
                <textarea rows={2} value={item.strategicLogistics} onChange={(e) => update({ ...item, strategicLogistics: e.target.value })} placeholder="Strategic Logistics" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
              </div>
              <div className="border-t border-slate-200 pt-2">
                <p className="text-xs font-bold text-slate-600 mb-1">Metrics</p>
                <ArrayField items={item.metrics || []} onChange={(v) => update({ ...item, metrics: v })} addLabel="+ Add Metric" onAdd={() => update({ ...item, metrics: [...(item.metrics || []), { label: "", value: "" }] })}
                  renderItem={(met, mi, umet, rmet) => (
                    <div className="flex gap-2 items-center"><input type="text" value={met.value} onChange={(e) => umet({ ...met, value: e.target.value })} placeholder="Value" className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-xs focus:border-[#0055b8] focus:outline-none" />
                      <input type="text" value={met.label} onChange={(e) => umet({ ...met, label: e.target.value })} placeholder="Label" className="flex-1 rounded-lg border border-slate-200 px-2 py-1 text-xs focus:border-[#0055b8] focus:outline-none" />
                      <button onClick={rmet} className="text-red-500 text-xs">✕</button>
                    </div>
                  )}
                />
              </div>
              <div className="border-t border-slate-200 pt-2">
                <p className="text-xs font-bold text-slate-600 mb-1">Slider Images</p>
                <ArrayField items={item.journalSlider || []} onChange={(v) => update({ ...item, journalSlider: v })} addLabel="+ Add Image URL" onAdd={() => update({ ...item, journalSlider: [...(item.journalSlider || []), ""] })}
                  renderItem={(img, ii, uimg, rimg) => (
                    <div className="flex gap-2 items-center"><input type="text" value={img} onChange={(e) => uimg(e.target.value)} placeholder="Image path" className="flex-1 rounded-lg border border-slate-200 px-2 py-1 text-xs focus:border-[#0055b8] focus:outline-none" /><button onClick={rimg} className="text-red-500 text-xs">✕</button></div>
                  )}
                />
              </div>
            </div>
          )}
        />
      </Section>
    </div>
  );
}

// ===== FAITH ACADEMY FORM =====
function FaithAcademyForm({ data, onChange, mediaLibrary, onRefreshMedia }: { data: any; onChange: (d: any) => void; mediaLibrary: MediaItem[]; onRefreshMedia?: () => void }) {
  const set = (path: string, value: any) => {
    const keys = path.split(".");
    const newData = { ...data };
    let obj: any = newData;
    for (let i = 0; i < keys.length - 1; i++) { obj[keys[i]] = { ...obj[keys[i]] }; obj = obj[keys[i]]; }
    obj[keys[keys.length - 1]] = value;
    onChange(newData);
  };
  return (
    <div className="space-y-6">
      <Section title="Hero Section">
        <Field label="Title"><input type="text" value={data.title || ""} onChange={(e) => set("title", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none focus:ring-2" /></Field>
        <Field label="Subtitle"><textarea rows={2} value={data.subtitle || ""} onChange={(e) => set("subtitle", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none focus:ring-2 resize-none" /></Field>
        <ImageSelector mediaLibrary={mediaLibrary} value={data.heroImage || ""} onChange={(v) => set("heroImage", v)} label="Hero Image" />
      </Section>
      <Section title="Highlights / Academy Overview">
        <ArrayField items={data.highlights || []} onChange={(v) => set("highlights", v)} addLabel="+ Add Highlight" onAdd={() => set("highlights", [...(data.highlights || []), { icon: "", value: "", desc: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="flex gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
              <input type="text" value={item.icon} onChange={(e) => update({ ...item, icon: e.target.value })} placeholder="Icon emoji" className="w-16 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-center focus:border-[#0055b8] focus:outline-none" />
              <input type="text" value={item.value} onChange={(e) => update({ ...item, value: e.target.value })} placeholder="Value (e.g. CBC Compliant)" className="w-40 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <input type="text" value={item.desc} onChange={(e) => update({ ...item, desc: e.target.value })} placeholder="Description" className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <button onClick={remove} className="text-red-500 hover:text-red-700 text-xs">✕</button>
            </div>
          )}
        />
      </Section>
      <Section title="Why Choose Us">
        <ArrayField items={data.whyChooseUs || []} onChange={(v) => set("whyChooseUs", v)} addLabel="+ Add Reason" onAdd={() => set("whyChooseUs", [...(data.whyChooseUs || []), { icon: "", title: "", desc: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
              <div className="flex gap-2">
                <input type="text" value={item.icon} onChange={(e) => update({ ...item, icon: e.target.value })} placeholder="Icon" className="w-16 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-center focus:border-[#0055b8] focus:outline-none" />
                <input type="text" value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                <button onClick={remove} className="text-red-500 text-xs">✕</button>
              </div>
              <textarea rows={2} value={item.desc} onChange={(e) => update({ ...item, desc: e.target.value })} placeholder="Description" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
            </div>
          )}
        />
      </Section>
      <Section title="Curriculum Tabs">
        <ArrayField items={data.curriculumTabs || []} onChange={(v) => set("curriculumTabs", v)} addLabel="+ Add Tab" onAdd={() => set("curriculumTabs", [...(data.curriculumTabs || []), { id: Date.now().toString(), label: "", grades: "", items: [] }])}
          renderItem={(item, idx, update, remove) => (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between"><span className="text-xs font-bold text-slate-500">Tab {idx + 1}</span><button onClick={remove} className="text-red-500 text-xs">Remove</button></div>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={item.label} onChange={(e) => update({ ...item, label: e.target.value })} placeholder="Label" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                <input type="text" value={item.grades} onChange={(e) => update({ ...item, grades: e.target.value })} placeholder="Grades (e.g. Ages 4-6)" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              </div>
              <p className="text-xs font-bold text-slate-600 mt-2">Subjects/Items</p>
              <ArrayField items={item.items || []} onChange={(v) => update({ ...item, items: v })} addLabel="+ Add Subject" onAdd={() => update({ ...item, items: [...(item.items || []), { id: Date.now().toString(), title: "", description: "" }] })}
                renderItem={(sub, si, usub, rsub) => (
                  <div className="flex gap-2 items-center"><input type="text" value={sub.title} onChange={(e) => usub({ ...sub, title: e.target.value })} placeholder="Title" className="w-40 rounded-lg border border-slate-200 px-2 py-1 text-xs focus:border-[#0055b8] focus:outline-none" />
                    <input type="text" value={sub.description} onChange={(e) => usub({ ...sub, description: e.target.value })} placeholder="Description" className="flex-1 rounded-lg border border-slate-200 px-2 py-1 text-xs focus:border-[#0055b8] focus:outline-none" />
                    <button onClick={rsub} className="text-red-500 text-xs">✕</button>
                  </div>
                )}
              />
            </div>
          )}
        />
      </Section>
      <Section title="Activities">
        <ArrayField items={data.activities || []} onChange={(v) => set("activities", v)} addLabel="+ Add Activity" onAdd={() => set("activities", [...(data.activities || []), { icon: "", name: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="flex gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
              <input type="text" value={item.icon} onChange={(e) => update({ ...item, icon: e.target.value })} placeholder="Icon" className="w-16 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-center focus:border-[#0055b8] focus:outline-none" />
              <input type="text" value={item.name} onChange={(e) => update({ ...item, name: e.target.value })} placeholder="Activity name" className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <button onClick={remove} className="text-red-500 text-xs">✕</button>
            </div>
          )}
        />
      </Section>
      <Section title="Academy Slider Images">
        <ArrayField items={data.academyImages || []} onChange={(v) => set("academyImages", v)} addLabel="+ Add Image" onAdd={() => set("academyImages", [...(data.academyImages || []), { src: "", alt: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="flex gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
              <ImageSelector mediaLibrary={mediaLibrary} value={item.src} onChange={(v) => update({ ...item, src: v })} label="" />
              <input type="text" value={item.alt} onChange={(e) => update({ ...item, alt: e.target.value })} placeholder="Alt text" className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <button onClick={remove} className="text-red-500 text-xs">✕</button>
            </div>
          )}
        />
      </Section>
    </div>
  );
}

// ===== HOSPITAL PROJECT FORM =====
function HospitalProjectForm({ data, onChange, mediaLibrary, onRefreshMedia }: { data: any; onChange: (d: any) => void; mediaLibrary: MediaItem[]; onRefreshMedia?: () => void }) {
  const set = (path: string, value: any) => {
    const keys = path.split(".");
    const newData = { ...data };
    let obj: any = newData;
    for (let i = 0; i < keys.length - 1; i++) { obj[keys[i]] = { ...obj[keys[i]] }; obj = obj[keys[i]]; }
    obj[keys[keys.length - 1]] = value;
    onChange(newData);
  };
  return (
    <div className="space-y-6">
      <Section title="Hero Section">
        <Field label="Title"><input type="text" value={data.title || ""} onChange={(e) => set("title", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none focus:ring-2" /></Field>
        <Field label="Subtitle"><textarea rows={2} value={data.subtitle || ""} onChange={(e) => set("subtitle", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none focus:ring-2 resize-none" /></Field>
        <ImageSelector mediaLibrary={mediaLibrary} value={data.heroImage || ""} onChange={(v) => set("heroImage", v)} label="Hero Image" />
      </Section>
      <Section title="Statistics">
        <ArrayField items={data.stats || []} onChange={(v) => set("stats", v)} addLabel="+ Add Stat" onAdd={() => set("stats", [...(data.stats || []), { label: "", value: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="flex gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
              <input type="text" value={item.value} onChange={(e) => update({ ...item, value: e.target.value })} placeholder="Value" className="w-24 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <input type="text" value={item.label} onChange={(e) => update({ ...item, label: e.target.value })} placeholder="Label" className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <button onClick={remove} className="text-red-500 text-xs">✕</button>
            </div>
          )}
        />
      </Section>
      <Section title="Services">
        <ArrayField items={data.services || []} onChange={(v) => set("services", v)} addLabel="+ Add Service" onAdd={() => set("services", [...(data.services || []), { id: Date.now().toString(), title: "", description: "", hours: "", tags: "", focus: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between"><span className="text-xs font-bold text-slate-500">Service {idx + 1}</span><button onClick={remove} className="text-red-500 text-xs">Remove</button></div>
              <input type="text" value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <textarea rows={2} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
              <div className="grid grid-cols-3 gap-2">
                <input type="text" value={item.hours} onChange={(e) => update({ ...item, hours: e.target.value })} placeholder="Hours (e.g. 24 Hours)" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                <input type="text" value={item.tags} onChange={(e) => update({ ...item, tags: e.target.value })} placeholder="Tags (e.g. Emergency)" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                <input type="text" value={item.focus} onChange={(e) => update({ ...item, focus: e.target.value })} placeholder="Focus" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              </div>
            </div>
          )}
        />
      </Section>
      <Section title="Outreach Items">
        <ArrayField items={data.outreachItems || []} onChange={(v) => set("outreachItems", v)} addLabel="+ Add Outreach" onAdd={() => set("outreachItems", [...(data.outreachItems || []), { id: Date.now().toString(), title: "", description: "", icon: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between"><span className="text-xs font-bold text-slate-500">Item {idx + 1}</span><button onClick={remove} className="text-red-500 text-xs">Remove</button></div>
              <div className="flex gap-2">
                <input type="text" value={item.icon} onChange={(e) => update({ ...item, icon: e.target.value })} placeholder="Icon" className="w-16 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-center focus:border-[#0055b8] focus:outline-none" />
                <input type="text" value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              </div>
              <textarea rows={2} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
            </div>
          )}
        />
      </Section>
      <Section title="Admissions Process">
        <ArrayField items={data.admissionsProcess || []} onChange={(v) => set("admissionsProcess", v)} addLabel="+ Add Step" onAdd={() => set("admissionsProcess", [...(data.admissionsProcess || []), { id: Date.now().toString(), step: "", title: "", description: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between"><span className="text-xs font-bold text-slate-500">Step {idx + 1}</span><button onClick={remove} className="text-red-500 text-xs">Remove</button></div>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={item.step} onChange={(e) => update({ ...item, step: e.target.value })} placeholder="Step label" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                <input type="text" value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              </div>
              <textarea rows={2} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
            </div>
          )}
        />
      </Section>
    </div>
  );
}

// ===== MISSION OUTREACH FORM =====
function MissionOutreachForm({ data, onChange, mediaLibrary, onRefreshMedia }: { data: any; onChange: (d: any) => void; mediaLibrary: MediaItem[]; onRefreshMedia?: () => void }) {
  const set = (path: string, value: any) => {
    const keys = path.split(".");
    const newData = { ...data };
    let obj: any = newData;
    for (let i = 0; i < keys.length - 1; i++) { obj[keys[i]] = { ...obj[keys[i]] }; obj = obj[keys[i]]; }
    obj[keys[keys.length - 1]] = value;
    onChange(newData);
  };
  return (
    <div className="space-y-6">
      <Section title="Hero Section">
        <Field label="Title"><input type="text" value={data.title || ""} onChange={(e) => set("title", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none focus:ring-2" /></Field>
        <Field label="Subtitle"><textarea rows={2} value={data.subtitle || ""} onChange={(e) => set("subtitle", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none focus:ring-2 resize-none" /></Field>
      </Section>
      <Section title="Ministry Branches">
        <ArrayField items={data.branches || []} onChange={(v) => set("branches", v)} addLabel="+ Add Branch" onAdd={() => set("branches", [...(data.branches || []), { id: Date.now().toString(), title: "", description: "", link: "", linkText: "" }])}
          renderItem={(item, idx, update, remove) => (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between"><span className="text-xs font-bold text-slate-500">Branch {idx + 1}</span><button onClick={remove} className="text-red-500 text-xs">Remove</button></div>
              <input type="text" value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              <textarea rows={2} value={item.description} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none resize-none" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={item.link} onChange={(e) => update({ ...item, link: e.target.value })} placeholder="Link URL" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
                <input type="text" value={item.linkText} onChange={(e) => update({ ...item, linkText: e.target.value })} placeholder="Link Text" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-900 focus:border-[#0055b8] focus:outline-none" />
              </div>
            </div>
          )}
        />
      </Section>
    </div>
  );
}

// ===== UI HELPERS =====
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-700 mb-1">{label}</label>
      {children}
    </div>
  );
}