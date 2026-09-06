import TaxonomyIndexPage from "../features/taxonomy/TaxonomyIndexPage";
import { RECIPIENT_META, DEFAULT_META } from "../data/taxonomyMeta";

const Recipients = () => (
  <TaxonomyIndexPage
    taxonomyName="recipient"
    basePath="/recipients"
    eyebrow="Shop by recipient"
    title="Who are we spoiling today?"
    lede="Nine people worth celebrating, each with gifts made for them."
    bannerWorld="love"
    bannerGlyph="🤍"
    metaMap={RECIPIENT_META}
    defaultMeta={DEFAULT_META}
  />
);

export default Recipients;
