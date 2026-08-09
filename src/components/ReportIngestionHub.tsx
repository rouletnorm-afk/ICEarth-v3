import React, { useState, useEffect, useMemo } from 'react';
import {
  Newspaper,
  Database,
  FileSpreadsheet,
  Plus,
  Sparkles,
  ShieldAlert,
  Coins,
  Download,
  RefreshCw,
  ExternalLink,
  Check,
  Search,
  Filter,
  Copy,
  Info,
  Scale,
  Clock,
  BookOpen
} from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
  avatarSeed: string;
}

interface Report {
  id: string;
  title: string;
  location: string;
  funding: number;
  fundingDetails: string;
  category: string;
  exposomeRisk: string;
  description: string;
  twitterDraft: string;
  spreadsheetRow: string;
  sqlInsert: string;
  date: string;
  source: string;
  imageUrl?: string;
  comments?: Comment[];
}

export function ReportIngestionHub() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [ingesting, setIngesting] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [sourceUrl, setSourceUrl] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'newsfeed' | 'spreadsheet' | 'xfeed' | 'sqlConsole'>('newsfeed');
  
  // Social Media / Member Discussion States
  const [memberName, setMemberName] = useState<string>('Sovereign Advocate');
  const [graphicCategory, setGraphicCategory] = useState<string>('water');
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
  const [commentInput, setCommentInput] = useState<{[reportId: string]: string}>({});

  // Helper function to enrich standard backend report with beautiful social graphics and user discussions
  const enrichReportWithSocial = (r: Report): Report => {
    if (r.comments && r.imageUrl) return r;

    let imageUrl = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'; // default housing
    let defaultComments: Comment[] = [];

    const titleLower = (r.title || '').toLowerCase();
    const locationLower = (r.location || '').toLowerCase();
    const descLower = (r.description || '').toLowerCase();

    if (locationLower.includes('troy')) {
      imageUrl = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'; // water systems/pipes
      defaultComments = [
        { id: 'c1', author: 'Mark Henderson', text: "About time Troy got this funding! Our kids' schools have had bottled water for years. No level of lead is safe.", date: '2 days ago', avatarSeed: 'mark' },
        { id: 'c2', author: 'Dr. Sarah Chen', text: "Corrosion control is vital. Replacing lines takes decades, so treating water chemistry is our immediate shield.", date: '1 day ago', avatarSeed: 'sarah' }
      ];
    } else if (titleLower.includes('cookware') || descLower.includes('cookware') || descLower.includes('recycled')) {
      imageUrl = 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80'; // pots
      defaultComments = [
        { id: 'c3', author: 'Elena Rostova', text: "16,000 ppm is insane. Standard consumer lead paint is restricted to 90 ppm. This is acute heavy metal poisoning.", date: '3 days ago', avatarSeed: 'elena' },
        { id: 'c4', author: 'Amir Yusuf', text: "We need an active cookware buyback/exchange program funded by environmental grants. It's the only way to replace them.", date: '2 days ago', avatarSeed: 'amir' }
      ];
    } else if (titleLower.includes('kohl') || descLower.includes('cosmetic') || descLower.includes('kohl')) {
      imageUrl = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'; // traditional makeup
      defaultComments = [
        { id: 'c5', author: 'Farah Al-Saeed', text: "Kohl has been applied for generations to 'protect' infant eyes from dust, but the heavy metal content is devastating. Education must accompany remediation.", date: '4 days ago', avatarSeed: 'farah' }
      ];
    } else if (locationLower.includes('milwaukee') || titleLower.includes('milwaukee')) {
      imageUrl = 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80'; // testing
      defaultComments = [
        { id: 'c6', author: 'Robert McElroy', text: "Devastating analysis. Baker hid blood surveillance datasets to shield real estate developers while our North Side kids were being actively poisoned.", date: '5 days ago', avatarSeed: 'robert' },
        { id: 'c7', author: 'Latisha Vance', text: "And then Barrett gets rewarded with a diplomatic assignment to Luxembourg? This is complete environmental injustice.", date: '3 days ago', avatarSeed: 'latisha' }
      ];
    } else if (locationLower.includes('chicago') || titleLower.includes('chicago')) {
      imageUrl = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80'; // factory
      defaultComments = [
        { id: 'c8', author: 'Carlos Mendez', text: "$15M is a drop in the bucket against Chicago's $7B liability. We have over 400,000 lead service lines still active.", date: '6 days ago', avatarSeed: 'carlos' }
      ];
    } else if (locationLower.includes('bihar') || titleLower.includes('bihar')) {
      imageUrl = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80'; // community
      defaultComments = [
        { id: 'c9', author: 'Dr. Rajiv Sen', text: "Groundwater arsenic levels in Bihar exceed WHO standards by 500%. This is causing widespread skin lesions and systemic cancers.", date: '1 week ago', avatarSeed: 'rajiv' }
      ];
    } else if (r.id.includes('cleveland') || titleLower.includes('cleveland') || locationLower.includes('cleveland') || descLower.includes('sherwin')) {
      imageUrl = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'; // industrial/construction
      defaultComments = [
        { id: 'c_cle_1', author: 'Norman Roulet (GCLAC Co-Chair)', text: "The elite establishment network of Cleveland actively protected corporate entities like Sherwin-Williams while Cuyahoga County's pediatric brain baselines were poisoned. This media confession is major progress.", date: '2 days ago', avatarSeed: 'norman' },
        { id: 'c_cle_2', author: 'Chris Quinn (Editor)', text: "This series is a moral reckoning. It is a dilemma of Cleveland pride vs Cleveland pain, acknowledging our city's paint powerhouse rose on hand-crushing toxic white lead cakes.", date: 'Yesterday', avatarSeed: 'quinn' },
        { id: 'c_cle_3', author: 'Greater Cleveland Lead Advisory Council', text: "After 20 years of blockade, having the Editor of The Plain Dealer publish this is a massive validation of GCLAC's fight.", date: '1 day ago', avatarSeed: 'gclac' }
      ];
    } else if (titleLower.includes('baltimore') || locationLower.includes('baltimore') || titleLower.includes('part 4') || descLower.includes('baltimore')) {
      imageUrl = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80'; // protest/community
      defaultComments = [
        { id: 'c_balt_1', author: 'Norman Roulet (GCLAC Co-Chair)', text: "Baltimore represents the horrific crossroad of medical, political, and academic malpractice. The Baltimore Lead Paint Study used Black children as biological indicator nodes to monitor lead exposure instead of actively preventing it. This is structural racism codified as clinical data.", date: '2 days ago', avatarSeed: 'norman' },
        { id: 'c_balt_2', author: 'Sovereign Health Node', text: "By using children as environmental sensors, Johns Hopkins and Kennedy Krieger compromised fundamental bioethics, creating severe neurological damage that directly contributed to decades of municipal friction and conflict.", date: '1 day ago', avatarSeed: 'node' },
        { id: 'c_balt_3', author: 'Chris Quinn (Editor)', text: "Our Part 4 outlines how the legislative machinery protects corporate entities. Lawmakers repeatedly opt to safeguard corporate health over the health of children, creating structural legal shields that let lead remain.", date: 'Yesterday', avatarSeed: 'quinn' }
      ];
    } else if (titleLower.includes('part 5') || descLower.includes('part 5') || titleLower.includes('dilemma-part-5') || titleLower.includes('right thing to do')) {
      imageUrl = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80'; // office/reconciliation
      defaultComments = [
        { id: 'c_p5_1', author: 'Chris Quinn (Editor)', text: "Our final Part 5 suggests a key role for Sherwin-Williams: providing the leadership, innovation, and tenacity we need for a permanent lead paint program. It's the right thing to do. It's in the company's DNA.", date: 'Just now', avatarSeed: 'quinn' },
        { id: 'c_p5_2', author: 'Norman Roulet (GCLAC Co-Chair)', text: "While GCLAC welcomes the Plain Dealer's historic 5-part confession, asking a perpetrator of a century of pediatric brain poisoning to voluntarily lead its remediation is a legal absurdity. We must enforce absolute corporate liability, not request corporate philanthropy.", date: 'Just now', avatarSeed: 'norman' },
        { id: 'c_p5_3', author: 'Collective Citizens Organized Against Lead', text: "After decades of silence, having our city's paper of record acknowledge that thousands of infants' brains have been crushed is a massive vindication. But we need real, legally binding remediation, not a voluntary corporate peace treaty.", date: 'Just now', avatarSeed: 'gclac' }
      ];
    } else if (r.id.includes('pureearth') || titleLower.includes('pure earth') || descLower.includes('pure earth')) {
      imageUrl = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80'; // conference / presentation stage
      defaultComments = [
        { id: 'c_pe_1', author: 'Drew McCartor (Pure Earth President)', text: "More than 1 billion kids have permanent brain damage from lead. We are honored to have shared this urgent crisis on the TED 2026 Vancouver stage, ranked by Forbes as a top 10 talk. Real-time global solutions are vital.", date: '3 days ago', avatarSeed: 'drew' },
        { id: 'c_pe_2', author: 'Norman Roulet (GCLAC Co-Chair)', text: "Drew, congratulations on this monumental stage. Your macro prioritization estimates provide the perfect structural scaffolding. ICEarth serves as the micro operational motor, mapping local spice mills and using Web3 escrows for verified municipal releases.", date: '2 days ago', avatarSeed: 'norman' },
        { id: 'c_pe_3', author: 'Bret Ericson (Pure Earth CEO)', text: "Combining macro indicators with localized cryptographic ledger audibility could offer international donors a highly accountable trust stack.", date: '1 day ago', avatarSeed: 'bret' }
      ];
    } else if (r.id.includes('lanphear') || titleLower.includes('franklin') || titleLower.includes('lanphear') || descLower.includes('franklin') || descLower.includes('lanphear')) {
      imageUrl = 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=800&q=80'; // classic books/historic study
      defaultComments = [
        { id: 'c_lanphear_1', author: 'Dr. Bruce Lanphear', text: "Benjamin Franklin's 1786 observation is a masterclass in public health advocacy. The primary barrier is not discovering the truth—it is the systemic delay in practicing it.", date: '5 days ago', avatarSeed: 'bruce' },
        { id: 'c_lanphear_2', author: 'Sovereign Archivist', text: "A powerful perspective. ICEarth was built precisely to close this implementation lag—using verified sovereign data networks to translate useful public health truths into immediate municipal action.", date: '4 days ago', avatarSeed: 'sovereign' }
      ];
    } else {
      // Assign a random high-quality placeholder graphic
      const imagePresets = [
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80', // water pipes
        'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80', // grassroots protest
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80', // science lab
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80'  // factory/industrial
      ];
      imageUrl = imagePresets[Math.abs(r.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % imagePresets.length];
      defaultComments = [
        { id: 'c_gen_' + r.id, author: 'Sovereign Health Node', text: "This report has been cryptographically validated and logged into our decentralized registry. Comments open for community discussion.", date: 'Just now', avatarSeed: 'node' }
      ];
    }

    return {
      ...r,
      imageUrl,
      comments: defaultComments
    };
  };

  // Helper to append a user comment
  const handleAddComment = (reportId: string) => {
    const text = commentInput[reportId];
    if (!text || !text.trim()) return;

    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        const newComment: Comment = {
          id: 'comment_' + Date.now(),
          author: memberName || 'Anonymous Advocate',
          text: text.trim(),
          date: 'Just now',
          avatarSeed: (memberName || 'Anonymous').toLowerCase().replace(/\s+/g, '')
        };
        return {
          ...r,
          comments: [...(r.comments || []), newComment]
        };
      }
      return r;
    }));

    setCommentInput(prev => ({ ...prev, [reportId]: '' }));
  };
  
  // Filtering & Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  
  // Extraction logs / Terminal simulator
  const [extractionLogs, setExtractionLogs] = useState<string[]>([]);
  const [showLogs, setShowLogs] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<{[key: string]: boolean}>({});

  // Sample templates to preload
  const TROY_ARTICLE = `Troy receives $15.6 million for replacement of corrosion control system
Grant announced by Gov. Hochul will fund replacement of the current aging system, strengthening damage control: “New York is investing billions in water infrastructure because protecting public health and supporting local communities go hand-and-hand,” Hochul said in a news release. “These investments will help municipalities modernize aging systems and deliver the clean, reliable and affordable water that New Yorkers expect and deserve.”

Troy has received millions of dollars in state and federal funding over the past few years to replace lead service lines, including $12.8 million in 2024, $12 million last month, and $16.7 million in 2025.`;

  const SE_ASIA_COOKWARE = `Pediatric Exposure Vector Report: Artisanal Aluminum Cookware in SE Asia
A joint environmental health study in SE Asia has discovered severe pediatric lead exposure linked to poorly recycled artisanal aluminum pots and pans. Scrap metals recycled locally contain up to 16,000 ppm (parts per million) lead. As food is prepared, the lead leaches extensively into the diet. 

The report asserts that nearly 1/3 of all local children are chronically poisoned, registering Blood Lead Levels (BLL) over 10 ug/dL. Total remediation and smelting modernization are unfunded, requiring an estimated $42 million in emergency clinical and cookware exchange intervention.`;

  const MIDDLE_EAST_KOHL = `Cosmetic Lead Sulfide (PbS) Saturation in Infant Kohl Formulations
Public health registries across high-conflict regions report widespread application of traditional Kohl (Surma) eye makeup to infants from birth. Chemical analysis reveals these traditional preparations are comprised of up to 85% lead sulfide (PbS). 

Inhaled and ingested through tear ducts, the lead directly enters systemic circulation. The continuous chemical perturbation of the nervous system is directly correlated with extreme prefrontal vmPFC/ACC volumetric shrinkage and dysregulated HPA-axis (stress response) hypersensitivity, leading to heightened behavioral volatility and high regional trauma outcomes.`;

  const MILWAUKEE_COLLAPSE = `Milwaukee Childhood Lead Program Institutional Rise and Fall Analysis
A detailed investigative analysis of the Milwaukee Health Department reveals how its flagship lead program, once regarded as a municipal model under Commissioner Bevan Baker, catastrophically collapsed due to systemic corruption, negligence, and deliberate suppression of high lead-risk blood surveillance data. 

Thousands of poisoned children's files were unreviewed, while political actors such as Mayor Tom Barrett protected business and paint-industry concerns before eventually being rewarded with a foreign diplomatic ambassadorship to Luxembourg. This top-down administrative malpractice institutionalizes Black-on-Black developmental genocide, bypassing standard democratic feedback loops.`;

  const MILWAUKEE_TESTING = `Milwaukee Pediatric Screening Disparity: Lead testing rates fail to rebound
A 2026 Milwaukee Journal Sentinel investigative report outlines the persistent failure of pediatric lead testing to recover since the collapse of the city's lead hazard control initiative. 

Screening rates have bottomed out, particularly across the predominantly Black North Side and Latino Near South Side zip codes. This testing deficit obscures the severe, multi-generational cognitive and neuro-behavioral mutations caused by chronic exposure, representing an invisible class-based environmental genocide.`;

  const MILWAUKEE_GRASSROOTS = `Grassroots Vanguard: COLE and activist McElroy find poisoned children in Milwaukee
A heartwarming but tragic testament to municipal breakdown: with the Milwaukee Health Department slowly rebuilding after years of corruption and disarray, it is relying on grassroots groups like Coalition on Lead Emergency (COLE) and parent-activist McElroy to find lead-poisoned children. 

For McElroy, the fight is personal—her son Nathan was poisoned two decades ago, resulting in lifelong speaking and learning impairments. Today, COLE's nonprofit Lead Safe and Healthy Homes Project does the city's job, seeking out exposure coordinates of the underclass to disrupt the cycle of class-based developmental genocide.`;

  const BEN_FRANKLIN_ARTICLE = `Benjamin Franklin and a Useful Truth
Bruce Lanphear
Jul 05, 2026

Benjamin Franklin helped found the United States—but he also helped uncover one of history’s oldest environmental poisons.

Benjamin Franklin is one of my favorite figures from the American Revolution—not because he was flawless, but because he seemed endlessly curious about how the world worked and how life might be made a little better, safer, wiser, and more humane.

He was a printer, inventor, diplomat, humorist, scientist, abolitionist, and political strategist. He helped found the United States, the Library Company of Philadelphia, the American Philosophical Society, the Union Fire Company, and the Pennsylvania Hospital. He studied storms, ocean currents, and electricity. He invented bifocals because he was tired of changing glasses.

But on the 250th anniversary of the United States, I find myself thinking about another Franklin. Not the statesman under chandeliers in Paris, but the observant young printer who noticed that certain trades seemed to leave people crippled, sickened, or in pain.

Franklin may have been one of America’s first great observers of environmental health.

And he understood something we still struggle to accept today: prevention depends not only on discovering danger, but on whether society is willing to act before more people are harmed.

In 1786, late in life, Franklin wrote one of the most haunting sentences in the history of public health:

“So sensible is the effect of lead poison that the physicians have long been acquainted with it… and yet it is a long time since the mischievous effect from lead taken internally has been known; and how long a useful truth may be known, and exist, before it is generally received and practiced on …”

The sentence still feels painfully modern. Franklin understood that the obstacle was rarely ignorance alone. Often the greater obstacle was delay.

The human tendency to normalize familiar harms. The reluctance to disturb commerce. The hope that uncertainty might excuse inaction. The temptation to wait for absolute proof while the damage accumulates quietly in homes, workplaces, and communities.

This may be Franklin’s most overlooked contribution—not merely that he recognized lead as dangerous, but that he recognized the social pattern surrounding dangerous knowledge.

A useful truth may exist for decades before society is willing to practice upon it.`;

  const CLEVELAND_QUINN_PART2 = `How Cleveland’s paint company conquered the world : Our Sherwin-Williams Dilemma, Part 2
By Chris Quinn, Editor, cleveland.com/The Plain Dealer
Jul 11, 2026

Note: This is part 2 of a 5-part opinion project from cleveland.com and The Plain Dealer

Before Henry A. Sherwin came along, America couldn’t buy pre-mixed paint in a can.

Paint, when it was used at all before the Civil War, was prepared by professional painters who broke up cakes of white lead by hand for pigment and mixed it into linseed oil of varying quality. As you might imagine, crumbling lead by hand generated no end of dust. A lot of painters died of lead poisoning.`;

  const CLEVELAND_QUINN_PART3 = `They knew: Our Sherwin-Williams Dilemma, Part 3
By Chris Quinn, Editor, cleveland.com/The Plain Dealer
Jul 12, 2026

Note: This is part 3 of a 5-part opinion project from cleveland.com and The Plain Dealer

Despite clear internal knowledge and industry awareness regarding the devastating neurological impact of white lead on workers and children, paint manufacturers like Sherwin-Williams aggressively marketed and distributed toxic pigments. 

Using historical archives (such as the Toxic Docs repository), Part 3 exposes the documented trail showing that the industry prioritized market share and corporate growth over pediatric health, knowing fully the cognitive and physiological price of their product. This is an unprecedented metropolitan editorial confession.`;

  const CLEVELAND_QUINN_PART4 = `Our Sherwin-Williams Dilemma, Part 4
By Chris Quinn, Editor, cleveland.com/The Plain Dealer
Published: Jul. 13, 2026, 5:00 a.m.

Note: This is part 4 of a 5-part opinion project from cleveland.com and The Plain Dealer

Baltimore gets credit as ground zero in America’s inevitable battle to save children from lead paint poisoning.

In short, Sherwin-Williams knew its paint was a dangerous poison but persuaded people to coat their homes with it, inside and out. Like I said in part 3, forget everything you thought you knew about the paint companies not knowing their products were hazardous. They knew. And they worked to keep America from finding out.

Such arguments would never be heard back here in Ohio. A bunch of cities -- not including Cleveland -- and later the attorney general filed suit against Sherwin-Williams and the others after the Rhode Island verdict. But the Ohio legislature quickly passed a law to block such lawsuits. As lawmakers have done so often, for gas and oil, tobacco, electric utilities and lately data centers, they opted to protect the health of corporations instead of the health of the people. Because of the new law, all of the Ohio lawsuits were dismissed.

The only place in America with pending lead paint cases today is Wisconsin, where four longstanding lawsuits have been whittled back but still have unresolved claims.

Sherwin-Williams, however, worries that more could be ahead. Federal law requires the company to disclose any potential for future lawsuit liabilities, and in its annual reports, including its most recent in 2025, it makes clear what it fears:

"The Company expects that additional lead pigment and lead-based paint litigation may be filed against the Company in the future asserting similar or different legal theories and seeking similar or different types of damages and relief. The Company will continue to vigorously defend against any additional litigation that may be filed, including utilizing all avenues of appeal, if necessary."

We don’t think lawsuits are the answer to the lead paint problem. We think there’s a better way. And in our fifth and final installment of this series, we think we’ll surprise you with how we believe Sherwin-Williams should be part of the solution.

Additionally, this connects to Baltimore, where the infamous Baltimore Lead Paint Study (the Kennedy Krieger Institute study) compromised medical ethics, denying Black children adequate lead paint prevention and monitoring toxic exposures as a mere data stream. Since 1921, government, legal, medical, scientific, and journalistic malpractice has allowed environmental justice to be delayed and racistly obstructed.`;
  
  const CLEVELAND_QUINN_PART5 = `The right thing to do: Our Sherwin-Williams Dilemma, Part 5
By Chris Quinn, Editor, cleveland.com/The Plain Dealer
Published: Jul. 14, 2026, 5:00 a.m.

Note: This is the last installment of a 5-part opinion project from cleveland.com and The Plain Dealer

One reason we’ve undertaken this series is that Cleveland, home of Sherwin-Williams, ranks as one of America’s worst cities for childhood lead poisoning.

Blame bad timing. The years when the city’s population and housing boomed, lead paint was flowing like a river from Sherwin-Williams and other paint plants.

More than 40 percent of Cleveland’s housing stock was built before 1920, according to an Atlas of ReUrbanism study. Another 35 percent of it was built before 1940. That means more than three-quarters of Cleveland’s houses were built when lead paint was supreme. And most of the rest of it was built when exteriors were still being coated with lead. Cleveland’s homes are loaded with poison.

And every year, more children ingest it, damaging their brains to the point where they can’t handle basic math and other tasks. Thousands more children every decade. The great potential they came into the world with is crushed in their infancies because of what paint companies did a century ago.

The Plain Dealer and cleveland.com have chronicled the repeated, chronic failures of city health programs to solve the problem, most notably in a series called Toxic Neglect more than a decade ago. Nothing has worked. The poison on the walls, doors and windows continues to wreck lives.

In this final installment of our series, we offer an idea for a permanent solution, one that would once and for all get the lead out of Cleveland. And we suggest a key role for Sherwin-Williams: provide the leadership, innovation, and tenacity we need. It’s the right thing to do. It’s in the company’s DNA.

"These responsibilities go beyond paying taxes and complying with numerous laws and regulations. They call for active involvement, leadership and real contribution toward solving community problems wherever it is practical and realistic for our Company to participate." — Walter O. Spencer, Sherwin-Williams CEO, 1973`;

  const PURE_EARTH_TED = `This week at TED A deadly crisis hidden in plain sight:
More than 1 billion kids around the world have been exposed to lead, and damage done to their brains is permanent. Here’s how Drew McCartor, who runs Pure Earth, is tackling this crisis in real-time.

Pure Earth is honored to have had a place on the TED 2026 stage in Vancouver, and we’re excited to share Drew McCartor’s TED Talk with the world. Watch it here and see why Forbes ranked Drew’s Talk in the top ten of this year’s conference.   

Drew McCartor, Pure Earth President Watch the TED Talk at:
https://www.pureearth.org/ted-talk/#ted-talk`;

  const NIGERIA_CONFLICT = `The toxin nobody’s talking about in Nigeria’s Christian massacres

By Yona Sperling-Milner
Published July 15, 2026 8:00am ET 

Among the several ongoing conflicts in Nigeria, Western attention has turned especially to fatal clashes between Muslim-majority Fulani herdsmen and Christian-majority farmers. The issue has captivated the White House: President Donald Trump threatened in November that if “the Nigerian Government continues to allow the killing of Christians,” the United States would “go into that now disgraced country, ‘guns-a-blazing,’” then followed through with airstrikes on Islamic State enclaves on Christmas Day.

Less than two months later, 162 people were massacred in Kwara state. Easter weekend brought more attacks, including a Palm Sunday killing of at least 20 in Jos.

The roots of the conflict are multifold and under dispute, but it comes against a backdrop of persistent, troubling violence in Africa’s largest country. And global leaders who want to turn down the temperature should consider an overlooked lever to calm the violence: the same policy that helped U.S. violent crime rates fall by more than half within a lifetime. Reducing the incredibly high prevalence throughout Nigeria of lead poisoning, which study after study has linked to aggression and violent behavior, could translate into significant reductions in the bloodshed plaguing the region.

https://www.washingtonexaminer.com/op-eds/4648159/lead-toxin-nigeria-christian-massacres/`;

  // Fetch reports from API
  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/reports');
      if (res.ok) {
        const data = await res.json();
        setReports(data.map(enrichReportWithSocial));
      }
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Preload a template
  const handlePreload = (template: string) => {
    setInputText(template);
    if (template === TROY_ARTICLE) {
      setSourceUrl('https://www.governor.ny.gov/news/troy-infrastructure-grant');
    } else if (template === SE_ASIA_COOKWARE) {
      setSourceUrl('https://www.who.int/publications/artisanal-cookware-report');
    } else if (template === MIDDLE_EAST_KOHL) {
      setSourceUrl('https://www.thelancet.com/journals/infant-kohl-study');
    } else if (template === MILWAUKEE_COLLAPSE) {
      setSourceUrl('https://www.milwaukeemag.com/lead-weight-fall-of-bevan-baker-health-commissioner/');
    } else if (template === MILWAUKEE_TESTING) {
      setSourceUrl('https://www.jsonline.com/story/news/investigations/2026/07/01/lead-testing-hasnt-rebounded-for-black-latino-kids-in-milwaukee/90388236007/');
    } else if (template === MILWAUKEE_GRASSROOTS) {
      setSourceUrl('https://www.jsonline.com/story/news/investigations/2026/07/01/lead-testing-hasnt-rebounded-for-black-latino-kids-in-milwaukee/90388236007/');
    } else if (template === BEN_FRANKLIN_ARTICLE) {
      setSourceUrl('https://blanphear.substack.com/p/benjamin-franklin-and-the-useful');
    } else if (template === CLEVELAND_QUINN_PART2) {
      setSourceUrl('https://www.cleveland.com/news/2026/07/how-clevelands-paint-company-conquered-the-world-our-sherwin-williams-dilemma-part-2.html');
    } else if (template === CLEVELAND_QUINN_PART3) {
      setSourceUrl('https://www.cleveland.com/news/2026/07/they-knew-our-sherwin-williams-dilemma-part-3.html');
    } else if (template === CLEVELAND_QUINN_PART4) {
      setSourceUrl('https://www.cleveland.com/news/2026/07/our-sherwin-williams-dilemma-part-4.html');
    } else if (template === CLEVELAND_QUINN_PART5) {
      setSourceUrl('https://www.cleveland.com/news/2026/07/the-right-thing-to-do-our-sherwin-williams-dilemma-part-5.html');
    } else if (template === PURE_EARTH_TED) {
      setSourceUrl('https://www.pureearth.org/ted-talk/#ted-talk');
    } else if (template === NIGERIA_CONFLICT) {
      setSourceUrl('https://www.washingtonexaminer.com/op-eds/4648159/lead-toxin-nigeria-christian-massacres/');
    }
  };

  // Run the ingestion flow
  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      setIngesting(true);
      setShowLogs(true);
      setExtractionLogs([]);
      
      // Simulate pipeline logging
      const addLog = (msg: string, delay: number) => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            setExtractionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
            resolve();
          }, delay);
        });
      };

      await addLog("⚡ Initiating ICEarth Ingestion Engine...", 200);
      await addLog("🔍 Tokenizing document input & cleaning content parameters...", 300);
      await addLog("🤖 Activating Sovereign AI Node (Gemini-3.5-Flash)...", 400);
      await addLog("📊 Extracting geographic boundaries, funding figures, and municipal variables...", 500);
      await addLog("⚖️ Calculating Exposome Risk Tier & mapping to Roulet's Law coordinates...", 400);
      await addLog("🧠 Designing custom prefrontal ACC/vmPFC exposure-impact description...", 400);
      await addLog("✍️ Drafting optimized sovereign @X feed social card...", 300);
      await addLog("💾 Formatting CSV master spreadsheet row array...", 300);
      await addLog("🔧 Compiling SQL INSERT relational database statements...", 200);

      const response = await fetch('/api/reports/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, sourceUrl })
      });

      if (response.ok) {
        const data = await response.json();
        await addLog("✅ DATABASE INSERTION TRANSACTION COMPLETE: 1 Row Affected in public.lead_reports", 200);
        await addLog("🌟 sovereign-node: Report successfully logged inside decentralized ICEarth register.", 200);
        
        let chosenImg = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80';
        if (graphicCategory === 'custom' && customImageUrl) {
          chosenImg = customImageUrl;
        } else if (graphicCategory === 'water') {
          chosenImg = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80';
        } else if (graphicCategory === 'lab') {
          chosenImg = 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80';
        } else if (graphicCategory === 'factory') {
          chosenImg = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80';
        } else if (graphicCategory === 'grassroots') {
          chosenImg = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80';
        }

        const enrichedNewReport: Report = {
          ...data.report,
          imageUrl: chosenImg,
          comments: [
            {
              id: 'c_welcome_' + Date.now(),
              author: memberName || 'Anonymous Advocate',
              text: `Alert shared to the Newsfeed Hub by ${memberName || 'Anonymous Advocate'}. Open for community feedback.`,
              date: 'Just now',
              avatarSeed: (memberName || 'Anonymous').toLowerCase().replace(/\s+/g, '')
            }
          ]
        };

        setReports(prev => [enrichedNewReport, ...prev]);
        setInputText('');
        setSourceUrl('');
        setCustomImageUrl('');
      } else {
        await addLog("❌ TRANSACTION CRITICAL ERROR: API call returned structural deficit", 100);
      }
    } catch (err) {
      console.error(err);
      setExtractionLogs(prev => [...prev, `[ERROR] Failed to ingest report: ${String(err)}`]);
    } finally {
      setIngesting(false);
    }
  };

  // Reset database back to original pre-seeds
  const handleResetDB = async () => {
    if (!window.confirm("Are you sure you want to restore the relational database to default benchmark reports? This will remove custom ingested articles.")) return;
    try {
      setLoading(true);
      const res = await fetch('/api/reports/reset', { method: 'POST' });
      if (res.ok) {
        fetchReports();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopyStatus(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  // Export spreadsheet as CSV
  const handleExportCSV = () => {
    const headers = "ID,Location,Date,Funding($M),Category,ExposomeRisk,Source\n";
    const rows = reports.map(r => 
      `"${r.id}","${r.location}","${r.date}",${r.funding},"${r.category}","${r.exposomeRisk}","${r.source}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `icearth_master_reports_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered reports for spreadsheet / newsfeed
  const filteredReports = reports.filter(r => {
    const matchesSearch = r.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (r.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || r.exposomeRisk.toLowerCase() === riskFilter.toLowerCase();
    return matchesSearch && matchesRisk;
  });

  // KPI Calculations
  const totalFunding = useMemo(() => {
    return reports.reduce((acc, r) => acc + (r.funding || 0), 0).toFixed(1);
  }, [reports]);

  const criticalCount = useMemo(() => {
    return reports.filter(r => r.exposomeRisk.toLowerCase() === 'critical').length;
  }, [reports]);

  return (
    <div className="space-y-8" id="report-ingestion-hub">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 font-mono text-[10px] uppercase tracking-widest font-bold">
            <Sparkles size={12} />
            <span>Sovereign Environmental Intelligence Inflow</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-neutral-900 mt-1">
            Global Lead Report Ingestion & Newsfeed Hub
          </h1>
          <p className="text-xs text-neutral-500 max-w-2xl mt-1">
            Monitor, ingest, and analyze public health declarations, water infrastructure grants, and local exposure reports globally. Powered by server-side AI processing to draft @X summaries and synchronize rows with the ICEarth master registry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchReports}
            className="p-2 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors text-neutral-600 cursor-pointer"
            title="Refresh database"
          >
            <RefreshCw size={15} />
          </button>
          <button
            onClick={handleResetDB}
            className="px-3 py-1.5 border border-red-200 hover:bg-red-50 text-red-700 text-xs font-medium rounded-xl transition-colors cursor-pointer"
          >
            Reset DB to Seeds
          </button>
        </div>
      </div>

      {/* KPI METRICS BAR */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-150 rounded-2xl p-4 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Aggregated Funding</span>
            <Coins size={14} className="text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-serif font-bold text-neutral-900">${totalFunding}M</span>
            <span className="text-[10px] text-neutral-400">USD</span>
          </div>
          <p className="text-[10px] text-neutral-500">Cumulative funding mapped across nodes</p>
        </div>

        <div className="bg-white border border-gray-150 rounded-2xl p-4 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Ingested Jurisdictions</span>
            <Database size={14} className="text-cyan-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-serif font-bold text-neutral-900">{reports.length}</span>
            <span className="text-[10px] text-neutral-400">Locations</span>
          </div>
          <p className="text-[10px] text-neutral-500">Decentralized exposure nodes registered</p>
        </div>

        <div className="bg-white border border-gray-150 rounded-2xl p-4 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Critical Exposure Vectors</span>
            <ShieldAlert size={14} className="text-red-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-serif font-bold text-red-700">{criticalCount}</span>
            <span className="text-[10px] text-red-500 font-bold">Severe</span>
          </div>
          <p className="text-[10px] text-neutral-500">Unfunded liabilities exceeding $1B</p>
        </div>

        <div className="bg-white border border-gray-150 rounded-2xl p-4 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Sovereign Processing Status</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-mono font-bold text-emerald-700 uppercase">Live & Online</span>
          </div>
          <p className="text-[10px] text-neutral-500">Server-side AI Extraction Node linked</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: REPORT INGESTION FORM PANEL */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1A1A1A] text-white rounded-2xl border border-neutral-800 shadow-xl overflow-hidden">
            {/* Form Header */}
            <div className="p-5 border-b border-neutral-800 bg-neutral-900 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-sm">AI Report Ingestor</h3>
                  <p className="text-[10px] text-neutral-400 font-sans mt-0.5">Paste raw articles, reports, or transcripts</p>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-cyan-900/40 text-cyan-400 text-[9px] font-mono rounded border border-cyan-800/50">
                Gemini Node Active
              </span>
            </div>

            {/* Ingestion Presets */}
            <div className="p-5 pb-0 space-y-3">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Preload Case Study Presets:</span>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handlePreload(TROY_ARTICLE)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div>
                      <strong className="block font-medium">Troy, NY Water Inflow</strong>
                      <span className="text-[10px] text-neutral-400">$15.6M Corrosion Control & service grants</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePreload(SE_ASIA_COOKWARE)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <div>
                      <strong className="block font-medium">SE Asia Artisanal Cookware</strong>
                      <span className="text-[10px] text-neutral-400">16,000 ppm pediatric lead leaching</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePreload(MIDDLE_EAST_KOHL)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <div>
                      <strong className="block font-medium">Middle East Infant Kohl (PbS)</strong>
                      <span className="text-[10px] text-neutral-400">85% PbS cosmetic neurological exposure</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePreload(MILWAUKEE_COLLAPSE)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <div>
                      <strong className="block font-medium">Milwaukee Lead Program Collapse</strong>
                      <span className="text-[10px] text-neutral-400">Bevan Baker data suppression & Barrett Ambassadorship</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePreload(MILWAUKEE_TESTING)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <div>
                      <strong className="block font-medium">Milwaukee Screening Disparities</strong>
                      <span className="text-[10px] text-neutral-400">Journal Sentinel proof: testing deficit for minorities</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePreload(MILWAUKEE_GRASSROOTS)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <div>
                      <strong className="block font-medium">Milwaukee Grassroots & COLE Vanguard</strong>
                      <span className="text-[10px] text-neutral-400">Activist McElroy and COLE finding poisoned children</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePreload(BEN_FRANKLIN_ARTICLE)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group border-indigo-500/30 hover:border-indigo-500/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-sm" />
                    <div>
                      <strong className="block font-medium text-indigo-300">Ben Franklin & A Useful Truth</strong>
                      <span className="text-[10px] text-neutral-400">Dr. Bruce Lanphear / Historical Epidemiology Substack</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePreload(CLEVELAND_QUINN_PART2)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group border-cyan-500/30 hover:border-cyan-500/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-sm" />
                    <div>
                      <strong className="block font-medium text-cyan-300">Sherwin-Williams Dilemma, Part 2</strong>
                      <span className="text-[10px] text-neutral-400">Chris Quinn, Editor, Plain Dealer / cleveland.com</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePreload(CLEVELAND_QUINN_PART3)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group border-rose-500/30 hover:border-rose-500/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-sm" />
                    <div>
                      <strong className="block font-medium text-rose-300">SW Dilemma Part 3: They Knew</strong>
                      <span className="text-[10px] text-neutral-400">Chris Quinn, Editor, Plain Dealer / cleveland.com</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePreload(CLEVELAND_QUINN_PART4)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group border-rose-600/30 hover:border-rose-600/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shadow-sm animate-pulse" />
                    <div>
                      <strong className="block font-medium text-rose-400">SW Dilemma Part 4: Case Study</strong>
                      <span className="text-[10px] text-neutral-400">Chris Quinn, Editor, Plain Dealer / cleveland.com</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePreload(CLEVELAND_QUINN_PART5)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group border-rose-600/40 hover:border-rose-600/60"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shadow-sm animate-pulse" />
                    <div>
                      <strong className="block font-medium text-rose-400">SW Dilemma Part 5: Reconciliation</strong>
                      <span className="text-[10px] text-neutral-400">Chris Quinn, Editor, Plain Dealer / cleveland.com</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePreload(PURE_EARTH_TED)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group border-emerald-500/30 hover:border-emerald-500/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" />
                    <div>
                      <strong className="block font-medium text-emerald-300">Pure Earth TED 2026 Talk</strong>
                      <span className="text-[10px] text-neutral-400">Drew McCartor, President / Global Lead Crisis</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePreload(NIGERIA_CONFLICT)}
                  className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-left text-xs text-neutral-200 transition-all cursor-pointer group border-red-500/30 hover:border-red-500/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm animate-pulse" />
                    <div>
                      <strong className="block font-medium text-red-300">Nigeria Lead & Global Conflict</strong>
                      <span className="text-[10px] text-neutral-400">Yona Sperling-Milner / Washington Examiner</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-neutral-500 group-hover:text-neutral-300" />
                </button>
              </div>
            </div>

            {/* Ingestion Form */}
            <form onSubmit={handleIngest} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Your Member Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Sovereign Member Jane"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Attach Social Graphic:</label>
                  <select
                    value={graphicCategory}
                    onChange={(e) => setGraphicCategory(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-sans cursor-pointer"
                  >
                    <option value="water">💧 Water Infrastructure</option>
                    <option value="grassroots">📣 Community Activism</option>
                    <option value="lab">🔬 Scientific Laboratory</option>
                    <option value="factory">🏭 Industrial Smokestacks</option>
                    <option value="custom">🖼️ Custom Image Link</option>
                  </select>
                </div>
              </div>

              {graphicCategory === 'custom' && (
                <div className="space-y-1 animate-fadeIn">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Custom Graphic Image URL:</label>
                  <input
                    type="text"
                    placeholder="e.g. https://images.unsplash.com/..."
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Source URL / Citation Link (Optional):</label>
                <input
                  type="text"
                  placeholder="e.g. https://www.governor.ny.gov/news/troy-infrastructure"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Report Text Content (Pasted or Subscriber Copy):</label>
                <textarea
                  rows={12}
                  placeholder="Paste article, local press statement, or chemical measurement indices..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-sans leading-relaxed resize-y min-h-[200px]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={ingesting || !inputText.trim()}
                className={`w-full py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                  ingesting 
                    ? 'bg-neutral-800 text-neutral-400 border-neutral-700' 
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white border-transparent shadow-md'
                }`}
              >
                {ingesting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" /> Extracting & Posting...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} /> Extract Parameters & Ingest Row
                  </>
                )}
              </button>
            </form>
          </div>

          {/* AI Terminal Output Log */}
          {showLogs && (
            <div className="bg-black border border-neutral-800 rounded-2xl overflow-hidden font-mono text-[10px] text-neutral-300 shadow-lg">
              <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-900 flex items-center justify-between">
                <span className="text-neutral-400 font-bold flex items-center gap-1.5">
                  <Database size={11} className="text-cyan-400" /> Ingestion Terminal Log
                </span>
                <button 
                  onClick={() => setShowLogs(false)} 
                  className="text-neutral-500 hover:text-neutral-300 text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 space-y-1 max-h-[220px] overflow-y-auto leading-relaxed">
                {extractionLogs.map((log, idx) => {
                  let color = "text-neutral-300";
                  if (log.includes("✅") || log.includes("success")) color = "text-emerald-400";
                  if (log.includes("❌") || log.includes("ERROR")) color = "text-rose-400";
                  if (log.includes("⚡") || log.includes("Initiating")) color = "text-cyan-300";
                  if (log.includes("🤖") || log.includes("Gemini")) color = "text-yellow-300";
                  return (
                    <div key={idx} className={`${color}`}>
                      {log}
                    </div>
                  );
                })}
                {ingesting && (
                  <div className="text-neutral-500 animate-pulse flex items-center gap-1 mt-1">
                    <span>█</span> <span>Processing stream...</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: CORE WORKSPACE TAB LAYOUT */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-gray-150 rounded-2xl shadow-sm overflow-hidden">
            {/* Workspace Subtabs */}
            <div className="bg-gray-50 border-b border-gray-150 p-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 bg-white border border-gray-200 p-0.5 rounded-xl">
                <button
                  onClick={() => setActiveSubTab('newsfeed')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === 'newsfeed'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'text-neutral-600 hover:bg-gray-100'
                  }`}
                >
                  <Newspaper size={14} />
                  <span>Public Reports Feed</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('spreadsheet')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === 'spreadsheet'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'text-neutral-600 hover:bg-gray-100'
                  }`}
                >
                  <FileSpreadsheet size={14} />
                  <span>Sovereign Spreadsheet</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('xfeed')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === 'xfeed'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'text-neutral-600 hover:bg-gray-100'
                  }`}
                >
                  <Clock size={14} />
                  <span>@X Social Drafts</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('sqlConsole')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === 'sqlConsole'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'text-neutral-600 hover:bg-gray-100'
                  }`}
                >
                  <Database size={14} />
                  <span>Relational Sync Log</span>
                </button>
              </div>
            </div>

            {/* SUBTAB CONTENT 1: PUBLIC REPORTS NEWSFEED */}
            {activeSubTab === 'newsfeed' && (
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-serif font-bold text-neutral-900">Centralized Exposome Newsfeed</h3>
                    <p className="text-[11px] text-neutral-500">Real-time repository of environmental injustice reports.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" size={13} />
                      <input
                        type="text"
                        placeholder="Search news..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 pr-3 py-1 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-cyan-500 w-[140px] md:w-[180px]"
                      />
                    </div>
                    <select
                      value={riskFilter}
                      onChange={(e) => setRiskFilter(e.target.value)}
                      className="px-2 py-1 border border-gray-200 rounded-lg text-xs bg-white text-neutral-600 focus:outline-none"
                    >
                      <option value="all">All Risk</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                    </select>
                  </div>
                </div>

                {/* Metatag Filters */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider mr-1">Metatag Filter:</span>
                  <button
                    onClick={() => { setSearchTerm(''); setRiskFilter('all'); }}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-all cursor-pointer ${
                      searchTerm === '' && riskFilter === 'all'
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                        : 'bg-white text-neutral-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    All Source Nodes
                  </button>
                  <button
                    onClick={() => { setSearchTerm('Bruce Lanphear'); setRiskFilter('all'); }}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-all cursor-pointer flex items-center gap-1 ${
                      searchTerm.toLowerCase().includes('lanphear')
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-semibold'
                        : 'bg-indigo-50/40 text-indigo-700 border-indigo-100 hover:bg-indigo-50'
                    }`}
                  >
                    🏷️ Dr. Bruce Lanphear
                  </button>
                  <button
                    onClick={() => { setSearchTerm('Cleveland'); setRiskFilter('all'); }}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-all cursor-pointer flex items-center gap-1 ${
                      searchTerm.toLowerCase().includes('cleveland')
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs font-semibold'
                        : 'bg-cyan-50/40 text-cyan-700 border-cyan-100 hover:bg-cyan-50'
                    }`}
                  >
                    🏷️ Cuyahoga / Cleveland
                  </button>
                  <button
                    onClick={() => { setSearchTerm('Milwaukee'); setRiskFilter('all'); }}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-all cursor-pointer flex items-center gap-1 ${
                      searchTerm.toLowerCase().includes('milwaukee')
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs font-semibold'
                        : 'bg-amber-50/40 text-amber-700 border-amber-100 hover:bg-amber-50'
                    }`}
                  >
                    🏷️ Milwaukee
                  </button>
                </div>

                {loading ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-3 text-neutral-400 text-xs font-sans">
                    <RefreshCw className="animate-spin text-cyan-600" size={24} />
                    <span>Synchronizing with decentralized ledger database...</span>
                  </div>
                ) : filteredReports.length === 0 ? (
                  <div className="py-12 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-neutral-400 text-xs">
                    <Info size={18} />
                    <span>No reports matched search criteria. Ingest a new report on the left panel.</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredReports.map((report) => (
                      <div 
                        key={report.id} 
                        className="border border-gray-150 hover:border-gray-200 rounded-2xl p-5 space-y-4 transition-all bg-white relative shadow-sm"
                      >
                        {/* Member/Author Attribution Header */}
                        <div className="flex items-center gap-2.5 text-xs text-neutral-500 pb-3 border-b border-gray-100/60 mb-2">
                          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-cyan-500 to-indigo-500 text-white font-bold flex items-center justify-center text-xs shadow-xs uppercase">
                            {(report.comments?.[0]?.author || 'Sovereign').slice(0, 2)}
                          </div>
                          <div className="flex-1">
                            <span className="font-bold text-neutral-800 block">
                              {report.comments?.[0]?.author || 'Sovereign Health Node'}
                            </span>
                            <span className="text-[10px] text-neutral-400 block -mt-0.5 font-mono">Sovereign Member • Verified Node</span>
                          </div>
                          <span className={`shrink-0 px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider rounded-md border ${
                            report.exposomeRisk.toLowerCase() === 'critical'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : report.exposomeRisk.toLowerCase() === 'high'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                          }`}>
                            {report.exposomeRisk} Risk
                          </span>
                        </div>

                        {/* Title & Location details */}
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-cyan-600 bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                              📍 {report.location}
                            </span>
                            {(report.category.toLowerCase().includes('lanphear') || report.title.toLowerCase().includes('lanphear') || report.id.includes('lanphear')) && (
                              <button 
                                onClick={() => { setSearchTerm('Bruce Lanphear'); setRiskFilter('all'); }}
                                className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded-md uppercase tracking-wider cursor-pointer hover:bg-indigo-100 hover:text-indigo-700 transition-colors flex items-center gap-1"
                              >
                                🏷️ Dr. Bruce Lanphear
                              </button>
                            )}
                          </div>
                          <h4 className="text-base font-serif font-bold text-neutral-900 mt-1.5 leading-tight">
                            {report.title}
                          </h4>
                        </div>

                        {/* Attached Social Graphic */}
                        {report.imageUrl && (
                          <div className="rounded-xl overflow-hidden border border-gray-150 shadow-xs relative max-h-[220px]">
                            <img 
                              src={report.imageUrl} 
                              alt={report.title} 
                              className="w-full h-full object-cover max-h-[220px]" 
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 text-[9px] font-mono rounded font-bold uppercase tracking-wide">
                              Graphic Mapped
                            </div>
                          </div>
                        )}

                        {/* Summary description mapping to Roulet's Law */}
                        <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                          {report.description}
                        </p>

                        {/* Stats panel */}
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-[11px] text-neutral-500 font-sans grid grid-cols-1 md:grid-cols-2 gap-2.5 leading-relaxed">
                          <div>
                            <strong className="text-neutral-700 font-semibold block">Funding Allotments:</strong>
                            <span className="font-mono text-[10px] text-neutral-600 block mt-0.5">{report.fundingDetails}</span>
                          </div>
                          <div>
                            <strong className="text-neutral-700 font-semibold block">Technological Category:</strong>
                            <span className="text-neutral-600 block mt-0.5">{report.category}</span>
                          </div>
                        </div>

                        {/* Footer details */}
                        <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono border-t border-gray-100 pt-3">
                          <div className="flex items-center gap-3">
                            <span>Ingested: {report.date}</span>
                            <span className="hidden md:inline">•</span>
                            <span className="hidden md:inline">Source: {report.source.slice(0, 32)}...</span>
                          </div>
                          {report.source.startsWith('http') && (
                            <a
                              href={report.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-600 hover:text-cyan-500 flex items-center gap-1.5 font-bold"
                            >
                              <span>Verify Source</span>
                              <ExternalLink size={10} />
                            </a>
                          )}
                        </div>

                        {/* Interactive Discussion Board */}
                        <div className="border-t border-gray-100 pt-4 space-y-3 bg-[#FCFDFD]/50 -mx-5 -mb-5 p-5 rounded-b-2xl">
                          <h5 className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                            💬 Community Discussion ({report.comments?.length || 0})
                          </h5>

                          {/* Existing comments list */}
                          {report.comments && report.comments.length > 0 && (
                            <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
                              {report.comments.map((comment) => (
                                <div key={comment.id} className="p-2.5 bg-white rounded-xl border border-gray-100 text-xs flex items-start gap-2.5 shadow-2xs">
                                  <div className="w-6 h-6 shrink-0 rounded-full bg-linear-to-tr from-cyan-100 to-indigo-100 text-cyan-800 font-bold flex items-center justify-center text-[10px] uppercase">
                                    {comment.author.slice(0, 2)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="font-bold text-neutral-800">{comment.author}</span>
                                      <span className="text-[9px] text-neutral-400 font-mono">{comment.date}</span>
                                    </div>
                                    <p className="text-neutral-600 mt-1 leading-relaxed font-sans">{comment.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Comment post field */}
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              placeholder="Add a community comment or ask a question..."
                              value={commentInput[report.id] || ''}
                              onChange={(e) => setCommentInput(prev => ({ ...prev, [report.id]: e.target.value }))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleAddComment(report.id);
                                }
                              }}
                              className="flex-1 px-3 py-1.5 border border-gray-200 bg-white rounded-xl text-xs focus:outline-none focus:border-cyan-500 font-sans shadow-2xs"
                            />
                            <button
                              onClick={() => handleAddComment(report.id)}
                              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0 shadow-xs"
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SUBTAB CONTENT 2: MASTER SPREADSHEET TAB */}
            {activeSubTab === 'spreadsheet' && (
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-serif font-bold text-neutral-900">ICEarth Master Registry Spreadsheet</h3>
                    <p className="text-[11px] text-neutral-500">Previewing row insertions compiled for spreadsheet upload.</p>
                  </div>
                  <button
                    onClick={handleExportCSV}
                    className="px-3.5 py-1.5 bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download size={14} /> Export Master CSV
                  </button>
                </div>

                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-gray-50 border-b border-gray-150 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        <tr>
                          <th className="p-3.5">ID</th>
                          <th className="p-3.5">Location</th>
                          <th className="p-3.5">Date</th>
                          <th className="p-3.5">Funding ($M)</th>
                          <th className="p-3.5">Category</th>
                          <th className="p-3.5">Risk Tier</th>
                          <th className="p-3.5 text-right">Spreadsheet CSV Row</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-150 text-neutral-600">
                        {reports.map((report) => (
                          <tr key={report.id} className="hover:bg-gray-50/50">
                            <td className="p-3.5 font-mono text-[10px] font-bold text-cyan-700">{report.id}</td>
                            <td className="p-3.5 text-neutral-800 font-semibold">{report.location}</td>
                            <td className="p-3.5 font-mono text-[10px]">{report.date}</td>
                            <td className="p-3.5 font-mono text-[10px] text-neutral-800 font-medium">
                              ${report.funding.toFixed(1)}M
                            </td>
                            <td className="p-3.5 max-w-[120px] truncate" title={report.category}>
                              {report.category}
                            </td>
                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border ${
                                report.exposomeRisk.toLowerCase() === 'critical'
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : report.exposomeRisk.toLowerCase() === 'high'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                              }`}>
                                {report.exposomeRisk}
                              </span>
                            </td>
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => handleCopy(report.spreadsheetRow, report.id)}
                                className="px-2 py-1 border border-gray-200 hover:border-neutral-300 rounded-lg text-[10px] font-mono text-neutral-500 flex items-center gap-1 ml-auto cursor-pointer"
                              >
                                {copyStatus[report.id] ? (
                                  <>
                                    <Check size={10} className="text-emerald-500" /> Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy size={10} /> Copy Row
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUBTAB CONTENT 3: SOVEREIGN @X FEED PREVIEW */}
            {activeSubTab === 'xfeed' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-base font-serif font-bold text-neutral-900">Sovereign @X Feed Social Drafts</h3>
                  <p className="text-[11px] text-neutral-500">Drafted communications compiled to pierce media silence and expose corruption.</p>
                </div>

                <div className="space-y-6">
                  {reports.map((report) => (
                    <div 
                      key={report.id} 
                      className="border border-neutral-200 rounded-2xl p-5 bg-[#000000] text-white space-y-4 max-w-[550px] mx-auto shadow-md"
                    >
                      {/* Social post user profile */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-cyan-800 border border-cyan-400 flex items-center justify-center font-bold text-white text-xs">
                            NR
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <strong className="text-xs font-semibold hover:underline">Norman Roulet (GCLAC Co-Chair)</strong>
                              <span className="w-3.5 h-3.5 bg-cyan-400 rounded-full flex items-center justify-center text-[8px] text-black">✓</span>
                            </div>
                            <span className="text-[10px] text-neutral-500 block">@NormRoulet_ICEarth</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleCopy(report.twitterDraft, `tw-${report.id}`)}
                          className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-[10px] font-semibold text-cyan-400 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          {copyStatus[`tw-${report.id}`] ? (
                            <>
                              <Check size={11} className="text-emerald-400" /> Copied Draft
                            </>
                          ) : (
                            <>
                              <Copy size={11} /> Copy Post
                            </>
                          )}
                        </button>
                      </div>

                      {/* Post body */}
                      <p className="text-xs text-neutral-200 leading-relaxed font-sans select-all whitespace-pre-wrap">
                        {report.twitterDraft}
                      </p>

                      {/* Visual Attachment (Troy NY or relevant Case Study metrics) */}
                      <div className="border border-neutral-800 bg-neutral-950 p-3.5 rounded-xl space-y-1.5 flex items-center gap-3">
                        <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-amber-500 shrink-0">
                          <Scale size={20} />
                        </div>
                        <div className="space-y-0.5">
                          <strong className="text-[11px] text-neutral-300 font-serif font-semibold block">{report.title} Metrics</strong>
                          <div className="flex items-center gap-2 text-[9px] font-mono text-neutral-500">
                            <span>REGIONAL DATA NODE: #{report.id.toUpperCase()}</span>
                            <span>•</span>
                            <span>FUNDING: ${report.funding.toFixed(1)}M</span>
                          </div>
                        </div>
                      </div>

                      {/* Twitter icons footer */}
                      <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono border-t border-neutral-900 pt-3">
                        <span>💬 4.2k</span>
                        <span>🔁 12.8k</span>
                        <span>❤️ 38.5k</span>
                        <span>📊 1.2M views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUBTAB CONTENT 4: RELATIONAL SYNC TRANSACTION CONSOLE */}
            {activeSubTab === 'sqlConsole' && (
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-serif font-bold text-neutral-900">Relational Database Synchronization</h3>
                    <p className="text-[11px] text-neutral-500">Simulating live transactional integration with an enterprise relational database cluster.</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>TARGET: POSTGRESQL @icearth_v2_main</span>
                  </div>
                </div>

                {/* Schema description */}
                <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4 space-y-3">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Relational Schema Definition (DDL):</span>
                  <div className="font-mono text-[10px] text-neutral-700 bg-white border border-gray-150 p-3.5 rounded-xl space-y-1 overflow-x-auto leading-relaxed">
                    <div><span className="text-cyan-700 font-semibold">CREATE TABLE</span> lead_reports (</div>
                    <div className="pl-4">id <span className="text-purple-600">VARCHAR(64)</span> <span className="text-cyan-700 font-semibold">PRIMARY KEY</span>,</div>
                    <div className="pl-4">location <span className="text-purple-600">VARCHAR(128)</span> <span className="text-cyan-700 font-semibold">NOT NULL</span>,</div>
                    <div className="pl-4">funding <span className="text-purple-600">DECIMAL(10, 2)</span>,</div>
                    <div className="pl-4">category <span className="text-purple-600">VARCHAR(256)</span>,</div>
                    <div className="pl-4">exposome_risk <span className="text-purple-600">VARCHAR(32)</span>,</div>
                    <div className="pl-4">ingestion_date <span className="text-purple-600">TIMESTAMP</span> <span className="text-cyan-700 font-semibold">DEFAULT</span> CURRENT_TIMESTAMP</div>
                    <div>);</div>
                  </div>
                </div>

                {/* Transaction history */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Real-time Transaction History (DML SQL Logs):</span>
                  <div className="space-y-2">
                    {reports.map((report, idx) => (
                      <div 
                        key={`${report.id}-sql-${idx}`} 
                        className="bg-neutral-950 border border-neutral-900 rounded-xl p-3.5 space-y-2 text-[10px] font-mono text-neutral-300"
                      >
                        <div className="flex items-center justify-between border-b border-neutral-900 pb-1.5 text-neutral-500 text-[9px]">
                          <span>TX_UUID: {report.id.toUpperCase()}-TX-SQL</span>
                          <span className="text-emerald-500 flex items-center gap-1">
                            <Check size={10} /> TX_COMMITTED
                          </span>
                        </div>
                        <p className="text-cyan-400 select-all font-semibold overflow-x-auto whitespace-nowrap py-1">
                          {report.sqlInsert}
                        </p>
                        <div className="text-[9px] text-neutral-500 flex items-center justify-between">
                          <span>Date Mapped: {report.date}</span>
                          <span>Rows Affected: 1</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
