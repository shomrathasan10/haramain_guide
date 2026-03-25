import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 py-14 text-white">
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-2xl font-bold">Haramain Guide</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            A complete Hajj and Umrah platform with live Haramain, Qibla, Tasbi,
            tools, historical places, hospitals, hotels, donations and admin control.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            <Link to="/">Home</Link>
            <Link to="/hajj">Hajj</Link>
            <Link to="/umrah">Umrah</Link>
            <Link to="/live">Live</Link>
            <Link to="/historical-places">Historical Places</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Support</h4>
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            <Link to="/hospitals">Hospitals</Link>
            <Link to="/hotels">Hotels</Link>
            <Link to="/lost-found">Lost & Found</Link>
            <Link to="/donate">Donate</Link>
            <Link to="/login">Admin Login</Link>
          </div>
        </div>
      </div>

      <div className="container-x mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
        © 2026 Haramain Guide. All rights reserved.
      </div>
    </footer>
  );
}