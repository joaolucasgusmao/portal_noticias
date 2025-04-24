import { IBannerReturn } from "@/@types/banner";

interface TopBannerComponentProps {
  banner: IBannerReturn[];
}

const TopBannerComponent = ({ banner }: TopBannerComponentProps) => {
  const topBanner = banner
    .filter((banner) => banner.positions.includes("top") && banner.is_active)
    .slice(0, 1);

  return (
    <div className="w-full max-w-[1295px]">
      {topBanner.map((banner) => (
        <div
          className="w-full h-auto lg:h-[350px] flex items-center justify-center"
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

export default TopBannerComponent;
