export function LocationMap() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#eeede3]">
      <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-muted">
        Lokasi contoh
      </span>
      <svg
        viewBox="0 0 540 290"
        role="img"
        aria-label="Ilustrasi lokasi Kantin Kita di dekat taman"
        className="h-auto w-full"
      >
        <rect width="540" height="290" fill="#eeede3" />
        <rect x="12" y="20" width="145" height="115" rx="20" fill="#dce3ce" />
        <rect x="206" y="16" width="96" height="63" rx="10" fill="#ded8c6" />
        <rect x="358" y="21" width="163" height="75" rx="10" fill="#ded8c6" />
        <rect x="32" y="200" width="116" height="72" rx="12" fill="#ded8c6" />
        <rect x="194" y="219" width="143" height="58" rx="10" fill="#ded8c6" />
        <rect x="389" y="184" width="166" height="119" rx="25" fill="#dce3ce" />
        <path
          d="M180 -10 166 310 M333 -10 365 310 M-20 164 560 113"
          stroke="white"
          strokeWidth="28"
        />
        <path
          d="M180 -10 166 310 M333 -10 365 310 M-20 164 560 113"
          stroke="#e5e3d9"
          strokeWidth="2"
          strokeDasharray="7 7"
        />
        <circle cx="68" cy="62" r="14" fill="#bdcba9" />
        <circle cx="126" cy="89" r="17" fill="#bdcba9" />
        <circle cx="465" cy="232" r="18" fill="#bdcba9" />
        <rect
          x="223"
          y="162"
          width="90"
          height="42"
          rx="8"
          fill="#faecdf"
          stroke="#b9572d"
          strokeWidth="1.5"
        />
        <text x="80" y="118" fill="#899174" fontSize="12" fontFamily="sans-serif">
          Taman
        </text>
        <path
          d="M268 92c-13 0-22 9-22 22 0 16 22 34 22 34s22-18 22-34c0-13-9-22-22-22Z"
          fill="#b9572d"
        />
        <circle cx="268" cy="113" r="8" stroke="white" fill="none" strokeWidth="2" />
        <rect x="232" y="144" width="72" height="24" rx="9" fill="white" />
        <text
          x="268"
          y="160"
          textAnchor="middle"
          fill="#2c2c25"
          fontSize="11"
          fontWeight="600"
          fontFamily="sans-serif"
        >
          Kantin Kita
        </text>
      </svg>
    </div>
  );
}
