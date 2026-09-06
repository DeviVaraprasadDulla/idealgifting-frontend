import TaxonomyDetailPage from "../features/taxonomy/TaxonomyDetailPage";
import { FEELING_META, DEFAULT_META } from "../data/taxonomyMeta";

const FeelingDetail = () => (
  <TaxonomyDetailPage
    taxonomyName="feeling"
    backPath="/"
    backLabel="Back home"
    metaMap={FEELING_META}
    defaultMeta={DEFAULT_META}
  />
);

export default FeelingDetail;
