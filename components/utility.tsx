export interface WithChildren {
  children?: React.ReactNode;
}

export const Title = ({ children }: WithChildren) => (
  <h1 className="text-4xl font-extrabold">{children}</h1>
);

export const Header = ({ children }: WithChildren) => (
  <header>{children}</header>
);
