import {Link} from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer() {
    return (
        <footer className="bg-blue-green text-white px-6 py-6">
            <div className="flex justify-between items-center">
                <nav className="flex gap-6">
                    <Link to="/" className="hover:text-green transition-colors">FAQ</Link>
                    <Link to="/" className="hover:text-green transition-colors">Terms</Link>
                    <a className="hover:text-green transition-colors" href="https://public.opendatasoft.com/explore/dataset/osm-france-food-service/information/?disjunctive.meta_code_com&disjunctive.meta_code_reg&disjunctive.meta_code_dep&sort=stars">Data Source</a>
                </nav>
                <p className="text-xs font-thin">Made with love by Oriane</p>
                <nav className="flex gap-6">
                    <InstagramIcon className="hover:text-green transition-colors"/>
                    <XIcon className="hover:text-green transition-colors"/>
                    <YouTubeIcon className="hover:text-green transition-colors"/>
                    <FacebookIcon className="hover:text-green transition-colors"/>
                </nav>
            </div>
        </footer>
    )
}