import { IBannerReturn } from "@/@types/banner";

interface SideBannerBannerComponentProps {
  banners: IBannerReturn[];
}

const SideBannerBannerComponent = ({
  banners,
}: SideBannerBannerComponentProps) => {
  const sideBannerBanner = banners
    .filter((banner) => banner.positions.includes("side") && banner.is_active)
    .slice(0, 3);

  return (
    <div className="w-full flex flex-col-reverse gap-8">
      {sideBannerBanner.map((banner) => (
        <div
          className="w-full h-auto flex items-center justify-center"
          key={banner.id}
        >
          <img
            src={banner.image}
            alt={banner.description}
            className="max-h-full object-contain cursor-pointer"
            onClick={() => {
              if (banner.link) {
                window.open(banner.link, "_blank", "noopener,noreferrer");
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SideBannerBannerComponent;
