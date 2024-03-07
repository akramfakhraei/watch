"use client";
import { getUserProfile } from "@/services/authServices";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
function Header() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfile
  })
  return (
    <header
    className={`shadow-md mb-10 sticky top-0 transition-all duration-200 bg-white ${
      isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
    }`}
    >
      <nav>
        <ul className="flex items-center  justify-between py-2 container xl:max-w-screen-xl">
          <li>

            <Link className="block py-2" href="/">
              خانه
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/">
              محصولات
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/">
              پنل کاربر
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/">
              پنل ادمین
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/">
              سبد خرید
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/auth">
              ورود
            </Link>
          </li>

        </ul>
      </nav>
    </header>
  );
}
export default Header;
