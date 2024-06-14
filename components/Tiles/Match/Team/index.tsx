import Image from "next/image";

export default function TeamTile({ team }) {
  return (
    <div className="flex flex-col gap-1 w-[150px] truncate items-center justify-end">
      {team.crest && (
        <Image
          className="rounded-lg h-[30px] w-[40px]"
          height={30}
          width={40}
          src={team.crest}
          alt="home-team-crest"
        />
      )}
      <div>{team.short_name}</div>
    </div>
  );
}
