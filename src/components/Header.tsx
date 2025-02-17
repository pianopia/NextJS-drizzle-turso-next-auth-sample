import Link from 'next/link';

interface HeaderProps {
  session: any;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  return (
    <header className="absolute top-0 right-0 flex gap-4 p-4 justify-end">
      {!session ? (
        <Link href="/api/auth/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </Link>
      ) : (
        <form action="/api/auth/signout" method="post">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign Out
          </button>
        </form>
      )}
      <Link href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Register
      </Link>
    </header>
  );
};

export default Header;
