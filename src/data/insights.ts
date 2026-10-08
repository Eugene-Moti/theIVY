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
  content: { heading?: string; body: string }[]
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
      },
      {
        heading: 'Rental Yields Remain Compelling',
        body: "Gross rental yields in prime Nairobi neighbourhoods currently range from 6 to 9 percent, well above comparable markets in London, Dubai, and Cape Town. The combination of strong rental income and capital appreciation makes Nairobi luxury apartments one of the most attractive real estate investments on the continent. Demand from expatriates, diplomats, NGO workers, and affluent Kenyans keeps premium units occupied at rates exceeding 90 percent in established locations.",
      },
      {
        heading: "The Off-Plan Advantage",
        body: "For investors with a medium-term horizon, off-plan purchases offer a particularly compelling entry point. Buying during the construction phase — especially at pre-launch — provides pricing that is typically 15 to 25 percent below the completed value, with the full appreciation gap captured between contract signing and project handover. Developments by established players such as The Ivy Group, with a verified track record of delivery, offer a reduced risk profile compared to first-time developers.",
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
    image: p('/Ivy Myst Assets/New Renders/Exterior/Exterior Day View.jpg'),
    featured: false,
    content: [
      {
        body: "Ask any seasoned Nairobi property professional to name the city's single most prestigious residential address, and the answer is almost invariably the same: Kileleshwa. Tucked between Westlands and Kilimani, this leafy suburb has maintained its status as Nairobi's premium enclave for decades — and shows no sign of relinquishing that crown.",
      },
      {
        heading: 'A Neighbourhood Defined by Greenery',
        body: "Unlike the dense commercial corridors that characterise much of central Nairobi, Kileleshwa is defined by wide, tree-lined avenues, generous setbacks, and a genuine sense of space. The neighbourhood's lower plot density — a product of its original residential zoning — means that even as high-rise development takes hold, residents enjoy a quality of environment that is simply unavailable in more congested parts of the city.",
      },
      {
        heading: 'Infrastructure and Connectivity',
        body: "Kileleshwa sits at an enviable intersection of connectivity and tranquillity. The neighbourhood is minutes from Westlands' business hub, 15 minutes from the Nairobi CBD, and well-served by multiple arterial roads. The proximity to Waiyaki Way and the Nairobi Expressway means that residents can reach virtually any part of the city with ease — without living in the thick of its traffic.",
      },
      {
        heading: 'Education, Health, and Lifestyle',
        body: "Kileleshwa's amenity profile is unmatched. The area is home to, or adjacent to, several of Nairobi's most respected schools — both local and international — as well as major private hospitals and specialist clinics. Upscale shopping, gourmet dining, and leisure facilities are all within a short radius, making Kileleshwa a genuinely self-contained lifestyle destination.",
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
      },
      {
        heading: '5. Wide Unit Selection',
        body: "Buyers who commit at the pre-launch stage enjoy the widest possible choice of unit type, floor level, aspect, and layout. The best units — high floors with views, corner apartments, those closest to amenities — are always claimed first.",
      },
      {
        heading: '6. Strong Rental Demand on Completion',
        body: "A newly completed luxury development in a prime Nairobi location attracts premium tenants immediately. Corporate occupiers, expatriates, and high-net-worth individuals actively seek new-build product, and early investors benefit from this demand without the depreciation associated with older stock.",
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
    image: p('/Luckinn Ivy Assets/Exterior/Luckinn Ivy Exterior.png'),
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
      },
      {
        heading: 'Connectivity at the Crossroads',
        body: "Westlands sits at the intersection of Nairobi's key arterial routes. The Nairobi Expressway has dramatically improved travel times to the CBD and JKIA, while Waiyaki Way connects the neighbourhood to Westlands, Karen, and the western suburbs. This connectivity premium is capitalised in property values — and continues to support appreciation.",
      },
      {
        heading: 'Rental Yields Among the Highest in Nairobi',
        body: "Gross rental yields for quality apartments in Westlands currently average 7.5 to 9.5 percent — among the highest in the city. Corporate lets to verified tenants, often with multinational employers underwriting the lease, provide income security that property investors in many other markets can only envy.",
      },
      {
        body: "Luckinn Ivy Residence, positioned on Mogotio Road in the heart of Westlands, captures all of these advantages in a single premium development. For investors seeking high-quality tenants, reliable yields, and long-term appreciation in one of Africa's most dynamic cities, Westlands — and Luckinn Ivy specifically — represents a compelling proposition.",
      },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getRelatedArticles(slug: string): Article[] {
  return articles.filter((a) => a.slug !== slug).slice(0, 3)
}
