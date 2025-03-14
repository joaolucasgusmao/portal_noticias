interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="top-0 w-full z-50 flex items-center justify-between px-4 bg-[var(--black)] h-14 border-b-2 border-b-[var(--black-3)] fixed">
      {children}
    </header>
  );
};

export default Header;
