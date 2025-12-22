import Link from "next/link";
import Logo from "../Logo";
import SectionContainer from "../SectionContainer";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <SectionContainer>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo variant="light" />
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
            <span className="text-gray-500">© 2025 SoFly</span>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}

