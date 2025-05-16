import { IBannerReturn } from "@/@types/banner";

interface SideHomeBannerComponentProps {
  banners: IBannerReturn[];
}

const SideHomeBannerComponent = ({ banners }: SideHomeBannerComponentProps) => {
  const sideHomeBanner = banners
    .filter(
      (banner) => banner.positions.includes("sideHome") && banner.is_active
    )
    .slice(0, 3);

  return (
    <div className="w-full flex flex-col-reverse gap-8">
      {sideHomeBanner.map((banner) => (
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

export default SideHomeBannerComponent;
