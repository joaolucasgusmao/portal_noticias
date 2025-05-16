import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ICoins } from "@/@types/coins";

interface CoinsComponentProps {
  coins: ICoins;
}

const CoinsComponent = ({ coins }: CoinsComponentProps) => {

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-lg text-[var(--black)] mb-2 text-center">
        Economia
      </h1>
      <div className="pt-2 w-[300px] h-[225px] border border-[var(--gray-2)]">
        <div className="flex items-center gap-14 justify-center">
          <div className="flex flex-col">
            <h2 className="text-base font-medium text-[var(--black)] text-center">
              Dólar
            </h2>
            <p className="text-[0.900rem] font-bold text-[var(--black)] pl-2">
              {Number(coins.USDBRL.ask).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p
              className={`text-sm font-bold ${
                Number(coins.USDBRL.pctChange) > 0
                  ? "text-[var(--green)]"
                  : Number(coins.USDBRL.pctChange) < 0
                  ? "text-[var(--red)]"
                  : "text-[var(--gray-3)]"
              }`}
            >
              {coins.USDBRL.pctChange && Number(coins.USDBRL.pctChange) > 0 ? (
                <>
                  <ExpandLessIcon
                    style={{
                      color: "text-[var(--green)]",
                      fontSize: "20px",
                    }}
                  />
                  +
                  {String(Number(coins.USDBRL.pctChange).toFixed(2)).replace(
                    ".",
                    ","
                  )}
                </>
              ) : coins.USDBRL.pctChange &&
                Number(coins.USDBRL.pctChange) < 0 ? (
                <>
                  <ExpandMoreIcon
                    style={{
                      color: "text-[var(--red)]",
                      fontSize: "20px",
                    }}
                  />
                  {String(Number(coins.USDBRL.pctChange).toFixed(2)).replace(
                    ".",
                    ","
                  )}
                </>
              ) : (
                <>
                  <ChevronRightIcon
                    style={{
                      color: "text-[var(--gray)]",
                      fontSize: "20px",
                    }}
                  />
                  {String(Number(coins.USDBRL.pctChange).toFixed(2)).replace(
                    ".",
                    ","
                  )}
                </>
              )}
              %
            </p>
          </div>
          <div className="w-[1px] h-[100px] bg-[var(--gray-2)] rotate-45" />

          <div className="flex flex-col">
            <h2 className="text-base font-medium text-[var(--black)] text-center">
              Euro
            </h2>
            <p className="text-[0.900rem] font-bold text-[var(--black)] pl-2">
              {Number(coins.EURBRL.ask).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p
              className={`text-sm font-bold ${
                Number(coins.EURBRL.pctChange) > 0
                  ? "text-[var(--green)]"
                  : Number(coins.EURBRL.pctChange) < 0
                  ? "text-[var(--red)]"
                  : "text-[var(--gray-3)]"
              }`}
            >
              {coins.EURBRL.pctChange && Number(coins.EURBRL.pctChange) > 0 ? (
                <>
                  <ExpandLessIcon
                    style={{
                      color: "text-[var(--green)]",
                      fontSize: "20px",
                    }}
                  />
                  +
                  {String(Number(coins.EURBRL.pctChange).toFixed(2)).replace(
                    ".",
                    ","
                  )}
                </>
              ) : coins.EURBRL.pctChange &&
                Number(coins.EURBRL.pctChange) < 0 ? (
                <>
                  <ExpandMoreIcon
                    style={{
                      color: "text-[var(--red)]",
                      fontSize: "20px",
                    }}
                  />
                  {String(Number(coins.EURBRL.pctChange).toFixed(2)).replace(
                    ".",
                    ","
                  )}
                </>
              ) : (
                <>
                  <ChevronRightIcon
                    style={{
                      color: "text-[var(--gray-3)]",
                      fontSize: "20px",
                    }}
                  />
                  {String(Number(coins.EURBRL.pctChange).toFixed(2)).replace(
                    ".",
                    ","
                  )}
                </>
              )}
              %
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col mt-1 pt-6 border-t border-[var(--gray-2)]">
          <h2 className="text-base font-medium text-[var(--black)]">Bitcoin</h2>
          <p className="text-[0.900rem] font-bold text-[var(--black)]">
            {Number(coins.BTCBRL.ask).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p
            className={`text-sm font-bold ${
              Number(coins.BTCBRL.pctChange) > 0
                ? "text-[var(--green)]"
                : Number(coins.BTCBRL.pctChange) < 0
                ? "text-[var(--red)]"
                : "text-[var(--gray-3)]"
            }`}
          >
            {coins.BTCBRL.pctChange && Number(coins.BTCBRL.pctChange) > 0 ? (
              <>
                <ExpandLessIcon
                  style={{
                    color: "text-[var(--green)]",
                    fontSize: "20px",
                  }}
                />
                +
                {String(Number(coins.BTCBRL.pctChange).toFixed(2)).replace(
                  ".",
                  ","
                )}
              </>
            ) : coins.BTCBRL.pctChange && Number(coins.BTCBRL.pctChange) < 0 ? (
              <>
                <ExpandMoreIcon
                  style={{
                    color: "text-[var(--red)]",
                    fontSize: "20px",
                  }}
                />
                {String(Number(coins.BTCBRL.pctChange).toFixed(2)).replace(
                  ".",
                  ","
                )}
              </>
            ) : (
              <>
                <ChevronRightIcon
                  style={{
                    color: "text-[var(--gray-3)]",
                    fontSize: "20px",
                  }}
                />
                {String(Number(coins.BTCBRL.pctChange).toFixed(2)).replace(
                  ".",
                  ","
                )}
              </>
            )}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinsComponent;
