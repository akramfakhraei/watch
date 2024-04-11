"use client";
import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import { toLocalDateString } from "@/utils/toLocalDate";
import Link from "next/link";
function Profile() {
  const { data, isLoading } = useGetUser();
  const { user} = data || {};
  if (isLoading) return <Loading />;
  return (
    <div className="py-4">
      <h1 className="mb-4 text-xl">
        سلام ! <span className="font-bold">{user.name}</span> خوش آمدی!
      </h1>
      <p>
        <span>تاریخ پیوستن:</span>
        <span> {toLocalDateString(user.createdAt)} </span>
      </p>
    </div>
  );
}

export default Profile;