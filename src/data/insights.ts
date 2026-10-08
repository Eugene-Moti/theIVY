const p = (path: string) => encodeURI(path)

export interface Article {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
  image: string
  featured: boolean
  content: { heading?: string; body: string; image?: string; imageAlt?: string; imageCaption?: string }[]
}

export const articles: Article[] = [
  {
    slug: 'nairobi-luxury-real-estate-investment-guide-2026',
    title: "Nairobi's Luxury Real Estate Market: A 2026 Investment Guide",
    category: 'MARKET INSIGHTS',
    date: 'June 15, 2026',
    readTime: '6 min read',
    excerpt:
      "Nairobi's premium residential sector continues to outperform expectations. Here's a comprehensive look at why 2026 represents a golden window for property investors.",
    image: p('/Ivy Myst Assets/New Renders/Exterior/Rooftop view to the city.png'),
    featured: true,
    content: [
      {
        body: "Nairobi's real estate market has demonstrated remarkable resilience and sustained growth over the past decade, cementing the city's reputation as East Africa's premier property investment destination. Despite global economic headwinds, the Kenyan capital continues to attract substantial domestic and diaspora investment in premium residential property.",
      },
      {
        heading: 'Strong Fundamentals Drive Demand',
        body: "Several structural factors underpin the city's property market strength. A rapidly expanding middle and upper-middle class is driving demand for quality housing, while urbanisation continues to bring professionals into Nairobi's most desirable neighbourhoods. Kileleshwa, Westlands, and Kilimani — Nairobi's so-called 'golden triangle' — have seen consistent price appreciation of between 8 and 14 percent per annum over the last five years.",
        image: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251118_D01_Droneview-Day_Ivy Park.jpg'),
        imageAlt: 'Nairobi skyline from above',
        imageCaption: "Nairobi's skyline keeps rising across Kileleshwa, Westlands and Kilimani.",
      },
      {
        heading: 'Rental Yields Remain Compelling',
        body: "Gross rental yields in prime Nairobi neighbourhoods currently range from 6 to 9 percent, well above comparable markets in London, Dubai, and Cape Town. The combination of strong rental income and capital appreciation makes Nairobi luxury apartments one of the most attractive real estate investments on the continent. Demand from expatriates, diplomats, NGO workers, and affluent Kenyans keeps premium units occupied at rates exceeding 90 percent in established locations.",
      },
      {
        heading: "The Off-Plan Advantage",
        body: "For investors with a medium-term horizon, off-plan purchases offer a particularly compelling entry point. Buying during the construction phase — especially at pre-launch — provides pricing that is typically 15 to 25 percent below the completed value, with the full appreciation gap captured between contract signing and project handover. Developments by established players such as The Ivy Group, with a verified track record of delivery, offer a reduced risk profile compared to first-time developers.",
        image: p('/IVY PARK RESIDENCE Assests/INTERIOR/Living room.png'),
        imageAlt: 'Living room interior',
        imageCaption: "Buying off-plan locks in today's price against tomorrow's finish.",
      },
      {
        heading: 'Mortgage Financing Expanding',
        body: "Kenya's mortgage market has matured significantly. Several commercial banks now offer competitive home loan products with loan-to-value ratios of up to 80 percent, and interest rates have trended downward as the Central Bank of Kenya eased its benchmark rate. This has brought property ownership within reach of a broader pool of buyers, further stimulating demand in the KES 6 to 20 million price band — precisely the sweet spot targeted by developments like Ivy Park Residence.",
      },
      {
        body: "In summary, 2026 offers an exceptional combination of favourable market conditions, growing supply of quality product, and accessible financing. Whether you are a first-time buyer, seasoned investor, or diaspora Kenyan looking to build an asset base at home, Nairobi's luxury residential market warrants serious attention.",
      },
    ],
  },

  {
    slug: 'why-kileleshwa-is-nairobis-most-prestigious-address',
    title: "Why Kileleshwa Remains Nairobi's Most Prestigious Residential Address",
    category: 'NEIGHBOURHOOD GUIDES',
    date: 'June 8, 2026',
    readTime: '5 min read',
    excerpt:
      "From tree-lined avenues to world-class amenities, Kileleshwa has consistently attracted Nairobi's most discerning homeowners. Here's what makes it special.",
    image: 'https://aspvhjmmaaaivzezsnur.supabase.co/storage/v1/object/public/property-media/Ivymyst/260910_FINAL-RooftopAll2_IVY%20MYST.jpg',
    featured: false,
    content: [
      {
        body: "Ask any seasoned Nairobi property professional to name the city's single most prestigious residential address, and the answer is almost invariably the same: Kileleshwa. Tucked between Westlands and Kilimani, this leafy suburb has maintained its status as Nairobi's premium enclave for decades — and shows no sign of relinquishing that crown.",
      },
      {
        heading: 'A Neighbourhood Defined by Greenery',
        body: "Unlike the dense commercial corridors that characterise much of central Nairobi, Kileleshwa is defined by wide, tree-lined avenues, generous setbacks, and a genuine sense of space. The neighbourhood's lower plot density — a product of its original residential zoning — means that even as high-rise development takes hold, residents enjoy a quality of environment that is simply unavailable in more congested parts of the city.",
        image: p('/Blossoms Ivy Residence Assets/Exterior/Blossoms_Ivy exterior.png'),
        imageAlt: 'Blossoms Ivy Residence exterior',
        imageCaption: "Blossoms Ivy Residence rises above Kileleshwa's tree-lined streets.",
      },
      {
        heading: 'Infrastructure and Connectivity',
        body: "Kileleshwa sits at an enviable intersection of connectivity and tranquillity. The neighbourhood is minutes from Westlands' business hub, 15 minutes from the Nairobi CBD, and well-served by multiple arterial roads. The proximity to Waiyaki Way and the Nairobi Expressway means that residents can reach virtually any part of the city with ease — without living in the thick of its traffic.",
      },
      {
        heading: 'Education, Health, and Lifestyle',
        body: "Kileleshwa's amenity profile is unmatched. The area is home to, or adjacent to, several of Nairobi's most respected schools — both local and international — as well as major private hospitals and specialist clinics. Upscale shopping, gourmet dining, and leisure facilities are all within a short radius, making Kileleshwa a genuinely self-contained lifestyle destination.",
        image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/Blossoms Ivy_Lobby_R1_View 01-1.jpg'),
        imageAlt: 'Blossoms Ivy Residence lobby',
        imageCaption: 'A grand arrival lobby sets the tone from the moment you step in.',
      },
      {
        heading: 'Investment Performance',
        body: "From an investment perspective, Kileleshwa property has delivered consistent capital growth and strong rental returns. Premium apartments in the neighbourhood command monthly rents of KES 80,000 to over KES 200,000 depending on size and specification, with occupancy rates rarely falling below 92 percent. For investors, this translates into reliable passive income alongside medium-to-long-term capital appreciation.",
      },
      {
        body: "Blossoms Ivy Residence, located on Gatundu Road, places its residents at the very heart of everything Kileleshwa offers. For buyers seeking the finest address in Nairobi — combined with the safety net of a proven developer — it represents an opportunity that is genuinely difficult to replicate.",
      },
    ],
  },

  {
    slug: 'off-plan-property-investment-benefits-nairobi',
    title: 'Off-Plan Property Investment: 7 Key Benefits You Need to Know',
    category: 'INVESTMENT TIPS',
    date: 'May 28, 2026',
    readTime: '4 min read',
    excerpt:
      "Buying off-plan remains one of the most effective wealth-creation strategies in Nairobi real estate. Here are the seven most compelling reasons to invest before a project completes.",
    image: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop Celestial Pool.png'),
    featured: false,
    content: [
      {
        body: "Off-plan property investment — purchasing a unit before construction is complete — has long been a preferred strategy among Nairobi's most financially astute investors. The benefits are compelling, but they are amplified when you choose the right developer and the right location. Here are the seven reasons why off-plan investment deserves serious consideration.",
      },
      {
        heading: '1. Lower Entry Price',
        body: "Pre-launch and early construction pricing is typically 15 to 25 percent below the eventual market value at completion. This immediate equity uplift is the single most attractive feature of off-plan investment, offering a built-in margin that a secondary market purchase simply cannot match.",
      },
      {
        heading: '2. Flexible Payment Plans',
        body: "Unlike a ready property, which requires a lump-sum payment or immediate mortgage drawdown, off-plan purchases allow buyers to spread payments across the construction timeline. A typical Ivy Group project requires a 20% deposit with the balance spread throughout the build period — giving investors time to arrange financing without pressure.",
      },
      {
        heading: '3. Capital Growth During Construction',
        body: "Every month that passes as a project rises from ground to rooftop represents capital appreciation in your favour. By the time you take possession of the keys, the market value of your unit will likely have increased substantially above the price you locked in at contract signing.",
      },
      {
        heading: '4. Brand-New Finishes and Modern Design',
        body: "Off-plan buyers receive a property with the latest specifications — modern kitchen fittings, smart-home technology, contemporary aesthetics — without the premium typically attached to a turnkey ready unit. There are no hidden maintenance costs or unfashionable finishes to contend with.",
        image: p('/Ivy Myst Assets/New Renders/Myst amenities/gym and yoga space.jpg'),
        imageAlt: 'Ivy Myst gym and yoga space',
        imageCaption: "Ivy Myst's amenities set a new benchmark for Kileleshwa living.",
      },
      {
        heading: '5. Wide Unit Selection',
        body: "Buyers who commit at the pre-launch stage enjoy the widest possible choice of unit type, floor level, aspect, and layout. The best units — high floors with views, corner apartments, those closest to amenities — are always claimed first.",
      },
      {
        heading: '6. Strong Rental Demand on Completion',
        body: "A newly completed luxury development in a prime Nairobi location attracts premium tenants immediately. Corporate occupiers, expatriates, and high-net-worth individuals actively seek new-build product, and early investors benefit from this demand without the depreciation associated with older stock.",
        image: p('/Ivy Myst Assets/New Renders/Myst amenities/Rooftop bar area.png'),
        imageAlt: 'Ivy Myst rooftop bar area',
        imageCaption: 'Rooftop social spaces keep demand high even before handover.',
      },
      {
        heading: '7. Developer Track Record Matters',
        body: "The key risk in off-plan investment is developer reliability. This is why The Ivy Group's proven record of delivering Diamond Homes, Nandwa Ivy, and Diamond Ivy on schedule is so significant — it provides buyers with the confidence to commit capital without anxiety about project completion.",
      },
    ],
  },

  {
    slug: 'westlands-nairobi-investment-property-guide',
    title: "Westlands: Why This District Continues to Be Nairobi's Top Investment Hub",
    category: 'NEIGHBOURHOOD GUIDES',
    date: 'May 15, 2026',
    readTime: '5 min read',
    excerpt:
      "Westlands combines commercial dynamism with residential appeal in a way that no other Nairobi neighbourhood can match — and that makes it perpetually attractive to property investors.",
    image: p('/Luckinn Ivy Assets/Amenities/Yoga Area.jpeg'),
    featured: false,
    content: [
      {
        body: "Westlands has evolved over the past two decades from a mid-market commercial zone into one of Nairobi's most desirable mixed-use districts. Today, the neighbourhood is home to the city's highest concentration of international businesses, five-star hotels, premium retail, and high-end residential developments — a combination that makes it uniquely attractive to property investors.",
      },
      {
        heading: 'Business Activity Drives Residential Demand',
        body: "Westlands hosts the regional headquarters of numerous multinational corporations, financial institutions, and international organisations. This concentration of white-collar professionals creates a deep, well-funded pool of residential tenants — precisely the demographic that sustains premium rental yields and low vacancy rates in high-end apartment developments.",
      },
      {
        heading: 'Retail and Lifestyle Infrastructure',
        body: "Few Nairobi neighbourhoods can match Westlands for lifestyle amenities. Sarit Centre, Westgate Mall, and The Village Market are all within easy reach, complemented by a dense restaurant and entertainment scene that makes the area genuinely self-contained. For young professionals and families who value convenience, Westlands is simply without peer.",
        image: p('/Luckinn Ivy Assets/Amenities/Lounge Area.jpeg'),
        imageAlt: 'Luckinn Ivy Residence lounge area',
        imageCaption: "Luckinn Ivy's lounge brings Westlands' social energy home.",
      },
      {
        heading: 'Connectivity at the Crossroads',
        body: "Westlands sits at the intersection of Nairobi's key arterial routes. The Nairobi Expressway has dramatically improved travel times to the CBD and JKIA, while Waiyaki Way connects the neighbourhood to Westlands, Karen, and the western suburbs. This connectivity premium is capitalised in property values — and continues to support appreciation.",
      },
      {
        heading: 'Rental Yields Among the Highest in Nairobi',
        body: "Gross rental yields for quality apartments in Westlands currently average 7.5 to 9.5 percent — among the highest in the city. Corporate lets to verified tenants, often with multinational employers underwriting the lease, provide income security that property investors in many other markets can only envy.",
        image: p('/Luckinn Ivy Assets/Amenities/Indoor heated Swimming Pool.png'),
        imageAlt: 'Luckinn Ivy Residence indoor heated swimming pool',
        imageCaption: "A heated indoor pool is among Luckinn Ivy's signature amenities.",
      },
      {
        body: "Luckinn Ivy Residence, positioned on Mogotio Road in the heart of Westlands, captures all of these advantages in a single premium development. For investors seeking high-quality tenants, reliable yields, and long-term appreciation in one of Africa's most dynamic cities, Westlands — and Luckinn Ivy specifically — represents a compelling proposition.",
      },
    ],
  },

  {
    slug: 'inside-ivy-myst-residence-kileleshwa',
    title: "Inside Ivy Myst Residence: Kileleshwa's New Address for Rooftop Living",
    category: 'PROJECT SPOTLIGHT',
    date: 'April 2, 2026',
    readTime: '5 min read',
    excerpt:
      "Groundbreaking is complete and sales are open. Here's a closer look at the development, the rooftop Celestial Pool, and what's still available across its two wings.",
    image: p('/Ivy Myst Assets/New Renders/Exterior/Rooftop Deck Exterior night view.png'),
    featured: false,
    content: [
      {
        body: "Ivy Myst Residence sits on Gatundu Road in Kileleshwa, a short walk from where Blossoms Ivy Residence is nearing completion. Spread across 22 residential floors and two wings, the development will hold 448 apartments — 190 one-bedroom, 168 two-bedroom, and 90 three-bedroom units — with an estimated completion of August 2029. Groundbreaking is complete, and the development is now selling at early-stage pricing.",
      },
      {
        heading: 'The Celestial Pool & Rooftop Deck',
        body: "The signature amenity sits on the roof: the Celestial Pool, framed by a waterfall feature, alongside a rooftop restaurant, bar, water lounge and fireplace, with an uninterrupted view across Kileleshwa and the city skyline beyond. A separate first-floor amenity level adds an indoor garden, heated pool, gym, sauna and massage room — amenities most Nairobi developments spread thinly across a single floor, here given room to breathe.",
        image: p('/Ivy Myst Assets/New Renders/Myst amenities/rooftop restaurant.png'),
        imageAlt: 'Ivy Myst Residence rooftop restaurant',
        imageCaption: 'The rooftop restaurant opens onto the Celestial Pool deck.',
      },
      {
        heading: 'Garden Terraces on Select Units',
        body: "A sculptural garden stream runs through the landscaped grounds at ground level, and select one and two-bedroom units carry their own garden terrace — a feature that's becoming a signature of Ivy Group's newer developments, and one that's hard to find elsewhere in Kileleshwa's high-rise stock.",
        image: p('/Ivy Myst Assets/New Renders/Myst amenities/garden stream.png'),
        imageAlt: 'Ivy Myst Residence garden stream',
        imageCaption: 'A landscaped stream runs through the ground-floor gardens.',
      },
      {
        heading: 'Unit Mix & Pricing',
        body: "One-bedroom units run 78–84 SQM from KES 8.8 million (≈$68K), two-bedrooms 121–159 SQM from KES 14.2 million (≈$109K), and three-bedroom + DSQ units 169–231 SQM from KES 19.8 million (≈$152K) — with garden terraces and DSQ available on select units in each wing.",
      },
      {
        body: "For buyers weighing Kileleshwa's established addresses against something newer, Ivy Myst offers the same postcode with rooftop amenities few existing buildings can match, at pricing that still reflects its early stage of construction.",
      },
    ],
  },

  {
    slug: 'ivy-park-residence-kilimani-living',
    title: 'Ivy Park Residence: Modern Living Minutes From Yaya Centre',
    category: 'PROJECT SPOTLIGHT',
    date: 'March 18, 2026',
    readTime: '4 min read',
    excerpt:
      "Three towers, 660 apartments, and a rooftop built for both families and entertaining — here's where construction stands at Ivy Park Residence in Kilimani.",
    image: p('/IVY PARK RESIDENCE Assests/EXTERIORS/251211_D03-Drone 2_IVY PARK.jpg'),
    featured: false,
    content: [
      {
        body: "Ivy Park Residence occupies a prime Kirichwa Road plot in Kilimani, minutes from Yaya Centre. At full build-out the development will comprise three residential towers across 22 floors with 660 apartments, ground-floor retail, and two basement parking levels — the largest of The Ivy Group's current developments by unit count.",
      },
      {
        heading: 'Scale & Construction Progress',
        body: "Structural works are currently underway on the fourth floor, with completion targeted for December 2028. The scale of the project means amenities are generous even by Ivy Group standards: a heated pool, rooftop garden and lounge, gym, yoga studio, coffee bar, co-working spaces and an indoor children's play area are all included, alongside a rooftop cinema — a feature unique to Ivy Park among the group's developments.",
        image: p('/IVY PARK RESIDENCE Assests/AMENITIES/ROOFTOP/251027_FINAL_Cinema-View 3_IVY PARK.jpg'),
        imageAlt: 'Ivy Park Residence rooftop cinema',
        imageCaption: "A rooftop cinema sets Ivy Park's amenity offer apart.",
      },
      {
        heading: 'A Courtyard Built for Community',
        body: "Between the towers, a landscaped courtyard gives residents a shared outdoor space at ground level — somewhere for children to play and neighbours to meet without leaving the development. It's a deliberate counterpoint to the density of 660 units, designed to keep the development feeling like a neighbourhood rather than a block.",
        image: p('/IVY PARK RESIDENCE Assests/COURTYARD/05_Courtyard 5K.png'),
        imageAlt: 'Ivy Park Residence courtyard',
        imageCaption: "The landscaped courtyard sits at the development's centre.",
      },
      {
        heading: 'Unit Mix & Pricing',
        body: "One-bedroom units start from KES 6.82 million (62–69 SQM), two-bedrooms from KES 10.78 million (73–128 SQM), and three-bedroom + DSQ units from KES 15.62 million (142 SQM) — pricing that reflects the project's early construction stage and its position in the KES 6–20 million band most diaspora and first-time buyers target.",
      },
    ],
  },

  {
    slug: 'blossoms-ivy-residence-near-completion',
    title: 'Blossoms Ivy Residence: Nearing Completion in Kileleshwa',
    category: 'PROJECT SPOTLIGHT',
    date: 'February 22, 2026',
    readTime: '4 min read',
    excerpt:
      "Most of Blossoms Ivy Residence has already sold. Here's what's left, what's finished, and why buyers are moving quickly on the remaining three-bedroom units.",
    image: p('/Blossoms Ivy Residence Assets/Blossoms Ivy Gate.jpg'),
    featured: false,
    content: [
      {
        body: "Blossoms Ivy Residence, on Gatundu Road in Kileleshwa, is one of the closest Ivy Group developments to handover, with completion targeted for December 2026. Two residential towers rise 22 floors above four basement parking levels, holding 220 apartments in total — the large majority of which are already sold.",
      },
      {
        heading: 'Final Stretch of Construction',
        body: "With the building substantially complete, the focus has shifted to interior finishing and amenity fit-out. The grand ground-floor lobby, dual backup generators, smart door locks and 24-hour security are already in place, giving buyers a rare chance to walk a near-finished Kileleshwa development rather than buy from renders alone.",
        image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/KCGV_Blossom Ivy_R2_Restaurant 5.jpg'),
        imageAlt: 'Blossoms Ivy Residence restaurant',
        imageCaption: "The development's restaurant space nears completion.",
      },
      {
        heading: 'Spa, Gym & Leisure Garden',
        body: "Amenities are concentrated on the basement's fourth level and include a heated indoor pool, fully equipped gym, yoga studio, spa, coffee bar and a leisure garden with both indoor and outdoor children's play areas — a full lifestyle floor rather than a single shared pool.",
        image: p('/Blossoms Ivy Residence Assets/FINALIZED AMENITIES INTERIORS - BLOSSOMS/KCGV_Blossom Ivy_R2_Spa 1.jpg'),
        imageAlt: 'Blossoms Ivy Residence spa',
        imageCaption: 'A dedicated spa sits alongside the gym and yoga studio.',
      },
      {
        heading: "What's Still Available",
        body: "The one, two, and four-bedroom + study + DSQ lines are sold out. What remains is the three-bedroom + DSQ line — 180–236 SQM, from KES 19,000,000 — spacious units with dual-access bathrooms and a study room in selected apartments, for buyers who want Kileleshwa's finest address with the risk of an unfinished building largely removed.",
      },
    ],
  },

  {
    slug: 'luckinn-ivy-residence-westlands-launch',
    title: 'Luckinn Ivy Residence: The Final Units Remaining in Westlands',
    category: 'PROJECT SPOTLIGHT',
    date: 'January 20, 2026',
    readTime: '4 min read',
    excerpt:
      "Luckinn Ivy's one and two-bedroom lines have already sold out. Here's what's driving demand for the three-bedroom + DSQ units still available on Mogotio Road.",
    image: p('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Entrance.png'),
    featured: false,
    content: [
      {
        body: "Luckinn Ivy Residence sits on Mogotio Road in the heart of Westlands — a single 20-floor tower holding 120 apartments, with two basement parking levels plus ground and first-floor parking. Completion is targeted for December 2026, putting the building among the nearest-to-handover in The Ivy Group's current portfolio.",
      },
      {
        heading: 'A Tower Nearing Handover',
        body: "With structural and finishing works well advanced, Luckinn Ivy is at the stage where buyers can assess real finishes rather than renders alone. The building's amenities — a heated indoor pool, fully equipped gym, co-working space, yoga room and children's play area — are largely complete, backed by smart door locks, backup power, a borehole and 24-hour CCTV security.",
        image: p('/Luckinn Ivy Assets/Amenities/Gym.jpeg'),
        imageAlt: 'Luckinn Ivy Residence gym',
        imageCaption: "The gym is among the amenities already fitted out.",
      },
      {
        heading: 'Only 3-Bedroom + DSQ Units Remain',
        body: "Both the one-bedroom and two-bedroom + DSQ lines are sold out. The three-bedroom + DSQ units that remain run 170–172 SQM — generously sized for Westlands, where most new stock skews toward smaller one and two-bedroom layouts aimed at renters rather than families.",
        image: p('/Luckinn Ivy Assets/Amenities/Kids Play Area.jpeg'),
        imageAlt: 'Luckinn Ivy Residence kids play area',
        imageCaption: "A dedicated play area suits the larger, family-sized units left.",
      },
      {
        body: "For buyers who want a near-complete Westlands address with family-sized units still on the table, Luckinn Ivy's remaining inventory is a narrowing window — contact our sales team for current pricing on the three-bedroom + DSQ line.",
      },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getRelatedArticles(slug: string): Article[] {
  const current = getArticle(slug)
  const others = articles.filter((a) => a.slug !== slug)
  if (!current) return others.slice(0, 3)
  // Prefer articles in the same category (e.g. other Project Spotlights, or
  // other Kileleshwa/Westlands guides) before falling back to the rest.
  const sameCategory = others.filter((a) => a.category === current.category)
  const remainder = others.filter((a) => a.category !== current.category)
  return [...sameCategory, ...remainder].slice(0, 3)
}
