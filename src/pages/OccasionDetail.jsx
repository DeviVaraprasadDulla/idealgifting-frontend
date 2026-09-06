import TaxonomyDetailPage from "../features/taxonomy/TaxonomyDetailPage";
import { OCCASION_META, DEFAULT_META } from "../data/taxonomyMeta";

const OccasionDetail = () => (
  <TaxonomyDetailPage
    taxonomyName="occasion"
    backPath="/occasions"
    backLabel="See all occasions"
    metaMap={OCCASION_META}
    defaultMeta={DEFAULT_META}
  />
);

export default OccasionDetail;
