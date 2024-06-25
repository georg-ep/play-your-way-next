import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="px-3 md:px-6 border-t border-slate-700 py-5 flex flex-col items-center justify-center text-sm">
      <div className='mb-2 flex gap-2'>
        <FaInstagram size={20} />
        <FaDiscord size={20} />
        <FaXTwitter size={20} />
      </div>
      <div>© 2024 PlayYourWay. All rights reserved.</div>
    </footer>
  );
}
