"use client";

import { useDashboardLayout } from "@/context/DashboardLayoutContext";
import SidebarIconComponent from "../Dashboard/Sidebar/SidebarIconComponent";
import { TextField } from "@mui/material";
import { ICategoryReturn } from "@/@types/category";
import React from "react";
import { IWeather } from "@/@types/weather";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";

interface HeaderComponentProps {
  categories: ICategoryReturn[];
  weatherInfos: IWeather;
}

const HeaderComponent = ({
  categories,
  weatherInfos,
}: HeaderComponentProps) => {
  const { open, handleToggleMenu } = useDashboardLayout();

  return (
    <header className="flex flex-col w-full fixed top-0 z-50">
      <div className="w-full px-5 md:px-10 flex items-center justify-start gap-8 sm:justify-between bg-[var(--white)] h-20">
        <div className="flex gap-4 items-center">
          <SidebarIconComponent
            homePage={true}
            open={open}
            handleToggleMenu={handleToggleMenu}
          />
          <div className="hidden md:flex items-center gap-1">
            <Image
              src={`https://openweathermap.org/img/wn/${weatherInfos.icon}@2x.png`}
              alt="Ícone do clima"
              className="w-10 h-10"
              width={100}
              height={100}
            />
            <div>
              <p className="text-sm font-medium text-[var(--black)]">
                Umuarama, PR | {weatherInfos.temp.toFixed(1)}°C
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-[var(--orange)] text-3xl font-bold">SUA LOGO</h1>
        <div className="hidden sm:flex items-center">
          <SearchIcon />
          <TextField
            placeholder="Buscar"
            type="text"
            name="title"
            sx={{
              backgroundColor: "var(--header-bg)",

              "& .MuiOutlinedInput-root": {
                alignItems: "center",
                "& fieldset": {
                  border: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid",
                  borderColor: "var(--header-logo)",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "var(--header)",
                  borderBottom: "1px solid",
                },
              },
              "& .MuiInputBase-input": {
                paddingLeft: "5px",
                color: "black",
                height: "1px",
                width: "8rem",
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.045rem",
                color: "black",
                opacity: 1,
              },
            }}
          />
        </div>
      </div>
      {categories.length > 0 ? (
        <div className="hidden w-full bg-[var(--orange)] px-4 sm:px-10 h-10 md:flex items-center justify-center">
          <h2 className="text-base flex gap-4 cursor-pointer items-center">
            {categories.map((category, index) => (
              <span key={index} className="font-medium text-[var(--white)]">
                {category.name}
              </span>
            ))}
          </h2>
        </div>
      ) : null}
    </header>
  );
};

export default HeaderComponent;
