import UserCard from "@/components/UserCard";

const UserAnalytics = () => {
  return (
    <div className="flex gap-4 justify-between flex-wrap">
      <UserCard type="admin" />
      <UserCard type="students" />
      <UserCard type="teachers" />
      <UserCard type="parents" />
    </div>
  );
};

export default UserAnalytics;
