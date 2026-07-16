import type { Language, Section, CategorySlug, StoryBlock, StoryTemplate } from "@/lib/content/types";

/**
 * Raw seed story — reading time is auto-calculated by the seed provider, and
 * the author is attached there, so we don't repeat them per story.
 */
export interface RawStory {
  slug: string;
  title: string;
  language: Language;
  section: Section;
  categories: CategorySlug[];
  coverImageUrl: string;
  coverImageAlt: string;
  excerpt: string;
  body: StoryBlock[];
  publishedAt: string;
  template?: StoryTemplate;
}

const img = (id: string, alt: string) => ({
  coverImageUrl: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`,
  coverImageAlt: alt,
});

const p = (text: string): StoryBlock => ({ _type: "paragraph", text });

/** A handful of bilingual placeholder pieces so the site is viewable immediately. */
export const SEED_STORIES: RawStory[] = [
  {
    slug: "the-last-letter",
    title: "The Last Letter",
    language: "en",
    section: "stories",
    categories: ["english-stories", "family"],
    ...img("1516414447565-b14be0adf13e", "An old fountain pen resting on a handwritten letter"),
    excerpt: "Some goodbyes are never spoken, they are written.",
    publishedAt: "2025-05-12",
    body: [
      p("He wrote the letter the night he decided to let go."),
      p("Not out of anger. Not out of pride. But because some words are too heavy to carry in silence."),
      p("The clock ticked softly. The room smelled of old books and rain. He began, as he always did, with her name — the only word that had never felt like a lie."),
      p("There were things he had meant to say for years. That he had noticed the way she hummed while making tea. That her laughter had once been the only reason he came home early. That he was sorry, mostly, for the silences he had mistaken for peace."),
      p("By the time the ink dried, the candle had burned low. He folded the page twice, the way she liked, and placed it where she would find it — under the small brass clock that had stopped years ago and that neither of them had ever bothered to fix."),
      p("He did not sign it. Some letters, he thought, are signed simply by being written at all."),
    ],
  },
  {
    slug: "the-empty-platform",
    title: "The Empty Platform",
    language: "en",
    section: "stories",
    categories: ["english-stories", "slice-of-life"],
    ...img("1474487548417-781cb71495f3", "A quiet railway platform at dusk"),
    excerpt: "Some waits change you forever.",
    publishedAt: "2025-05-05",
    body: [
      p("The 6:40 was late again, and Meena had stopped minding."),
      p("For eleven years she had stood on the same tile, third from the yellow line, waiting for a train that carried her to a job she no longer remembered choosing."),
      p("But tonight the platform was empty in a way it had never been. No vendors. No announcements. Only the long amber lights and the smell of monsoon coming."),
      p("She realised, standing there, that she had been waiting her whole life — for permission, for the right moment, for someone to tell her it was allowed to want more."),
      p("When the train finally arrived, its doors sighing open, she watched it leave without her. And for the first time in eleven years, she walked home the long way, unhurried, free."),
    ],
  },
  {
    slug: "coffee-after-rain",
    title: "Coffee After Rain",
    language: "en",
    section: "journal",
    categories: ["reading-journal", "slice-of-life"],
    ...img("1447933601403-0c6688de566e", "A cup of coffee on a wooden table"),
    excerpt: "Some days, all you need is rain, coffee and silence.",
    publishedAt: "2025-05-08",
    body: [
      p("It rained all morning, the sort of rain that makes the world go quiet."),
      p("I made coffee — too much, as always — and sat by the window with a book I had read three times already."),
      p("There is a particular happiness in re-reading. You are not there for the surprise. You are there for the company. For the sentences that feel like old friends who never change their opinion of you."),
      p("The rain slowed. The coffee went cold. And I stayed, unwilling to let the morning end, because some mornings are not meant to be productive. They are meant to be remembered."),
    ],
  },
  {
    slug: "when-growth-feels-lonely",
    title: "When Growth Feels Lonely",
    language: "en",
    section: "essays",
    categories: ["essays", "life-notes"],
    ...img("1499209974431-9dddcece7f88", "A person standing alone looking out a rain-streaked window"),
    excerpt: "The in-between phases you don't talk about the most.",
    publishedAt: "2025-05-10",
    body: [
      { _type: "heading", text: "The quiet cost of changing" },
      p("Nobody warns you that growth can be lonely."),
      p("You outgrow conversations before you outgrow the people having them. You start wanting different mornings, different arguments, different silences — and you cannot always explain why."),
      p("This is the in-between: too changed to go back, not yet arrived at whoever you are becoming. It is uncomfortable. It is necessary."),
      p("Be gentle with yourself here. Loneliness in a season of growth is not a sign you took the wrong turn. It is often the surest sign you took the right one."),
    ],
  },
  {
    slug: "the-forgotten-diary",
    title: "The Forgotten Diary",
    language: "en",
    section: "stories",
    categories: ["english-stories", "mystery"],
    ...img("1476081718509-d5d0b661a376", "An old leather diary on a desk"),
    excerpt: "Every page held a secret she had chosen to forget.",
    publishedAt: "2025-04-20",
    body: [
      p("The diary fell out of the bookshelf the day they packed up her mother's house."),
      p("The lock had rusted through. Inside, the handwriting was her mother's — but the name on the first page was not."),
      p("Page after page told the story of a woman she had never met, living a life her mother had never once mentioned in forty years."),
      p("Some families keep photographs. Hers, it seemed, had kept secrets — pressed flat and quiet between the pages, waiting for someone brave enough to read them."),
    ],
  },
  {
    slug: "a-rainy-day",
    title: "A Rainy Day",
    language: "en",
    section: "stories",
    categories: ["english-stories", "romance"],
    ...img("1428592953211-077101b2021b", "A misty forest lake on a rainy day"),
    excerpt: "They met under one umbrella and never quite left.",
    publishedAt: "2025-04-28",
    body: [
      p("They shared an umbrella for exactly four minutes."),
      p("He was going one way, she the other, and the rain had made strangers of everyone at the bus stop until it made them, briefly, something else."),
      p("Four minutes is not enough to fall in love. But it is enough to remember a face for years, to wonder, on other rainy days, where that person ended up."),
      p("Some love stories are not stories at all. They are just weather — arriving unannounced, leaving too soon, and changing the temperature of a whole life."),
    ],
  },
  {
    slug: "en-veetu-thottam",
    title: "என் வீட்டுத் தோட்டம்",
    language: "ta",
    section: "stories",
    categories: ["tamil-stories", "family"],
    ...img("1466781783364-36c955e42a7f", "A home garden with green plants"),
    excerpt: "அம்மா நட்ட மல்லிகை இன்னும் பூக்கிறது.",
    publishedAt: "2025-05-02",
    body: [
      p("எங்கள் வீட்டின் பின்புறத் தோட்டம் அம்மாவின் உலகம்."),
      p("அதிகாலையில் எழுந்து, தண்ணீர் ஊற்றி, ஒவ்வொரு செடியிடமும் பேசுவார். மல்லிகை, துளசி, சிறிய தக்காளிச் செடி — எல்லாம் அவரது குழந்தைகள் போலவே."),
      p("அம்மா இல்லாத இன்று, அந்தத் தோட்டத்தில் நான் நிற்கிறேன். மல்லிகை இன்னும் பூக்கிறது. அவர் விட்டுச் சென்ற அன்பு, மண்ணுக்குள் வேர்விட்டு, இன்றும் மணக்கிறது."),
      p("சில அன்புகள் மறைவதில்லை. அவை செடியாகி, பூவாகி, நம் வாழ்வில் மீண்டும் மலர்கின்றன."),
    ],
  },
  {
    slug: "mazhai-nyabagam",
    title: "மழை நினைவுகள்",
    language: "ta",
    section: "journal",
    categories: ["reading-journal", "life-notes"],
    ...img("1493314894560-5c412a56c17c", "Rain falling on a window pane"),
    excerpt: "ஒவ்வொரு மழையும் ஒரு பழைய நினைவைத் தூக்கி வருகிறது.",
    publishedAt: "2025-04-30",
    body: [
      p("மழை பெய்யத் தொடங்கியதும், மனம் பள்ளிக்கூடக் காலத்திற்குப் போய்விடுகிறது."),
      p("கிழிந்த குடையும், நனைந்த புத்தகப் பையும், சூடான காபியும் — அந்த நாட்களின் சின்னச் சின்ன மகிழ்ச்சிகள்."),
      p("இன்று ஜன்னலோரம் அமர்ந்து மழையைப் பார்க்கிறேன். வெளியே பெய்வது நீர்த்துளிகள் அல்ல; உள்ளே சேமித்து வைத்த நினைவுகள்."),
    ],
  },
];
