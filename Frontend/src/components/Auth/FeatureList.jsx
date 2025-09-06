import { FaHandshake, FaBoxOpen, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaHandshake size={22} className="text-[#782355]" />,
    title: "Seamless Buyer-Seller Connection",
    description:
      "EcoFinds empowers users to easily register, log in, and connect directly with others to buy or sell second-hand items, fostering a sustainable and trusted community.",
  },
  {
    icon: <FaBoxOpen size={22} className="text-[#782355]" />,
    title: "Clear Product Previews",
    description:
      "Create and manage detailed product listings with a title, description, category, price, and images—helping buyers make informed choices before contacting sellers.",
  },
  {
    icon: <FaMapMarkerAlt size={22} className="text-[#782355]" />,
    title: "Effortless Search & Discovery",
    description:
      "Find second-hand products quickly using intuitive filtering and search features, whether you’re browsing locally or globally, promoting responsible consumption.",
  },
  {
    icon: <FaShieldAlt size={22} className="text-[#782355]" />,
    title: "Secure and Stable Experience",
    description:
      "EcoFinds ensures a stable platform with efficient data management, secure authentication, and reliable product listings—providing a smooth and safe environment for sustainable trading.",
  },
];

export default function FeatureList() {
  return (
    <div className="flex flex-col gap-6 max-w-md w-full">
      <div className="md:hidden text-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Choose Sell X?</h3>
        <p className="text-sm text-gray-600">Discover the benefits of our platform</p>
      </div>
      {features.map((item, index) => (
        <div key={index} className="flex gap-4 items-start">
          <div className="flex-shrink-0">{item.icon}</div>
          <div>
            <h4 className="font-semibold text-gray-800">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}