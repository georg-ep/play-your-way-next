import Image from "next/image";

export default function TeamTile({ team }) {
  return (
    <div className="flex gap-1 truncate items-center">
      {team.crest && (
        <Image
          className="rounded-lg h-[15px] w-[20px]"
          height={15}
          width={20}
          src={team.crest}
          alt="home-team-crest"
        />
      )}
      <div className='ml-2'>{team.short_name}</div>
    </div>
  );
}
