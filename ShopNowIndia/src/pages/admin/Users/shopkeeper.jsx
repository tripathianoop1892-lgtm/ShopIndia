import PartnerUsers from "../../../components/Admin/PartnerUsers";
import { getShopkeeper } from "../../../services/api";

export default function Shopkeeper() {
  return <PartnerUsers title="Shopkeepers" role="shopkeeper" getUsers={getShopkeeper} />;
}
