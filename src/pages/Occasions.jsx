import TaxonomyIndexPage from "../features/taxonomy/TaxonomyIndexPage";
import { OCCASION_META, DEFAULT_META } from "../data/taxonomyMeta";

const Occasions = () => (
  <TaxonomyIndexPage
    taxonomyName="occasion"
    basePath="/occasions"
    eyebrow="Occasions"
    title="Every occasion has a story."
    lede="Ten reasons to celebrate someone, each with its own collection."
    bannerWorld="festive"
    bannerGlyph="🎉"
    metaMap={OCCASION_META}
    defaultMeta={DEFAULT_META}
  />
);

export default Occasions;
