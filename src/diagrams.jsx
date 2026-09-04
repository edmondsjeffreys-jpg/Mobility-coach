import React from "react";

/*
  Mobility Coach Diagram Library

  These diagrams are SVG, so:
  - they stay sharp at any screen size
  - they automatically use the app's slate/blue colour
  - there are no PNG files to upload
  - repeated exercises reuse the same diagram
*/

const S = {
  stroke: "currentColor",
  strokeWidth: 4,
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Arrow({ x1, y1, x2, y2 }) {
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        {...S}
        strokeWidth="3"
        opacity="0.55"
      />
      <polyline
        points={`${x2 - 8},${y2 - 6} ${x2},${y2} ${x2 - 8},${y2 + 6}`}
        {...S}
        strokeWidth="3"
        opacity="0.55"
      />
    </>
  );
}

function ArcArrow({
  path,
  endX,
  endY,
  rotate = 0,
}) {
  return (
    <>
      <path
        d={path}
        {...S}
        strokeWidth="3"
        opacity="0.55"
      />

      <g
        transform={`translate(${endX} ${endY}) rotate(${rotate})`}
        opacity="0.55"
      >
        <polyline
          points="-8,-6 0,0 -8,6"
          {...S}
          strokeWidth="3"
        />
      </g>
    </>
  );
}

function Ground() {
  return (
    <line
      x1="20"
      y1="158"
      x2="220"
      y2="158"
      {...S}
      strokeWidth="2"
      opacity="0.18"
    />
  );
}

function Head({ cx, cy, r = 10 }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      {...S}
    />
  );
}

function DiagramShell({
  children,
  label,
}) {
  return (
    <div
      className="svgDiagram"
      role="img"
      aria-label={label}
    >
      <svg
        viewBox="0 0 240 180"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </div>
  );
}

/* ======================================================
   STANDING / GENERAL
   ====================================================== */

function ChinTuck() {
  return (
    <DiagramShell label="Chin tuck and neck stretch">
      <Ground />

      <Head cx="118" cy="38" />

      <line
        x1="118"
        y1="48"
        x2="118"
        y2="105"
        {...S}
      />

      <line
        x1="118"
        y1="64"
        x2="91"
        y2="92"
        {...S}
      />

      <line
        x1="118"
        y1="64"
        x2="145"
        y2="92"
        {...S}
      />

      <line
        x1="118"
        y1="105"
        x2="98"
        y2="156"
        {...S}
      />

      <line
        x1="118"
        y1="105"
        x2="138"
        y2="156"
        {...S}
      />

      <Arrow
        x1="160"
        y1="38"
        x2="137"
        y2="38"
      />

      <path
        d="M102 25 Q92 39 101 51"
        {...S}
        strokeWidth="3"
        opacity="0.45"
      />
    </DiagramShell>
  );
}

function StandingSideBend() {
  return (
    <DiagramShell label="Standing overhead side bend">
      <Ground />

      <Head cx="111" cy="46" />

      <path
        d="M111 56 Q108 92 95 118"
        {...S}
      />

      <line
        x1="95"
        y1="118"
        x2="79"
        y2="157"
        {...S}
      />

      <line
        x1="95"
        y1="118"
        x2="112"
        y2="157"
        {...S}
      />

      <path
        d="M108 68 Q89 46 77 24"
        {...S}
      />

      <path
        d="M112 67 Q99 43 91 19"
        {...S}
      />

      <ArcArrow
        path="M149 54 Q163 75 148 96"
        endX={148}
        endY={96}
        rotate={110}
      />
    </DiagramShell>
  );
}

function StandingRotation({
  golf = false,
}) {
  return (
    <DiagramShell
      label={
        golf
          ? "Standing golf rotation"
          : "Standing torso rotation"
      }
    >
      <Ground />

      <Head cx="120" cy="35" />

      <line
        x1="120"
        y1="45"
        x2="120"
        y2="109"
        {...S}
      />

      <line
        x1="120"
        y1="67"
        x2="73"
        y2="72"
        {...S}
      />

      <line
        x1="120"
        y1="67"
        x2="167"
        y2="62"
        {...S}
      />

      <line
        x1="120"
        y1="109"
        x2="98"
        y2="157"
        {...S}
      />

      <line
        x1="120"
        y1="109"
        x2="143"
        y2="157"
        {...S}
      />

      {golf && (
        <line
          x1="65"
          y1="69"
          x2="177"
          y2="63"
          {...S}
          strokeWidth="3"
          opacity="0.45"
        />
      )}

      <ArcArrow
        path="M72 39 Q120 6 169 40"
        endX={169}
        endY={40}
        rotate={35}
      />
    </DiagramShell>
  );
}

function WallSlide() {
  return (
    <DiagramShell label="Wall slide">
      <line
        x1="62"
        y1="18"
        x2="62"
        y2="158"
        {...S}
        strokeWidth="3"
        opacity="0.35"
      />

      <Ground />

      <Head cx="101" cy="44" />

      <line
        x1="93"
        y1="52"
        x2="92"
        y2="111"
        {...S}
      />

      <line
        x1="92"
        y1="111"
        x2="78"
        y2="157"
        {...S}
      />

      <line
        x1="92"
        y1="111"
        x2="109"
        y2="157"
        {...S}
      />

      <path
        d="M92 67 L73 48 L69 25"
        {...S}
      />

      <path
        d="M94 67 L116 47 L121 24"
        {...S}
      />

      <Arrow
        x1="144"
        y1="101"
        x2="144"
        y2="48"
      />
    </DiagramShell>
  );
}

function CalfRaise({
  includeRock = false,
}) {
  return (
    <DiagramShell label="Calf raise and ankle movement">
      <Ground />

      <Head cx="112" cy="38" />

      <line
        x1="112"
        y1="48"
        x2="112"
        y2="104"
        {...S}
      />

      <line
        x1="112"
        y1="65"
        x2="90"
        y2="92"
        {...S}
      />

      <line
        x1="112"
        y1="65"
        x2="134"
        y2="92"
        {...S}
      />

      <line
        x1="112"
        y1="104"
        x2="96"
        y2="148"
        {...S}
      />

      <line
        x1="112"
        y1="104"
        x2="130"
        y2="148"
        {...S}
      />

      <line
        x1="96"
        y1="148"
        x2="106"
        y2="153"
        {...S}
      />

      <line
        x1="130"
        y1="148"
        x2="140"
        y2="153"
        {...S}
      />

      <Arrow
        x1="163"
        y1="139"
        x2="163"
        y2="104"
      />

      {includeRock && (
        <ArcArrow
          path="M54 128 Q42 145 58 153"
          endX={58}
          endY={153}
          rotate={20}
        />
      )}
    </DiagramShell>
  );
}

function SingleLegBalance() {
  return (
    <DiagramShell label="Single leg balance">
      <Ground />

      <Head cx="115" cy="34" />

      <line
        x1="115"
        y1="44"
        x2="115"
        y2="100"
        {...S}
      />

      <line
        x1="115"
        y1="62"
        x2="83"
        y2="81"
        {...S}
      />

      <line
        x1="115"
        y1="62"
        x2="147"
        y2="81"
        {...S}
      />

      <line
        x1="115"
        y1="100"
        x2="108"
        y2="157"
        {...S}
      />

      <path
        d="M115 101 Q143 111 141 137"
        {...S}
      />

      <path
        d="M92 31 Q74 50 90 69"
        {...S}
        strokeWidth="2"
        opacity="0.25"
      />

      <path
        d="M138 31 Q156 50 140 69"
        {...S}
        strokeWidth="2"
        opacity="0.25"
      />
    </DiagramShell>
  );
}

/* ======================================================
   SQUATS
   ====================================================== */

function Squat({
  deep = false,
}) {
  return (
    <DiagramShell
      label={
        deep
          ? "Deep squat hold"
          : "Bodyweight squat"
      }
    >
      <Ground />

      <g opacity="0.25">
        <Head cx="67" cy="35" />

        <line
          x1="67"
          y1="45"
          x2="67"
          y2="105"
          {...S}
        />

        <line
          x1="67"
          y1="105"
          x2="54"
          y2="157"
          {...S}
        />

        <line
          x1="67"
          y1="105"
          x2="82"
          y2="157"
          {...S}
        />
      </g>

      <Head
        cx="151"
        cy={deep ? 75 : 63}
      />

      <path
        d={
          deep
            ? "M146 85 Q130 102 121 119"
            : "M147 73 Q137 91 132 105"
        }
        {...S}
      />

      <path
        d={
          deep
            ? "M122 118 L94 132 L80 157"
            : "M132 105 L108 126 L95 157"
        }
        {...S}
      />

      <path
        d={
          deep
            ? "M122 118 L151 132 L168 157"
            : "M132 105 L158 125 L176 157"
        }
        {...S}
      />

      <line
        x1="141"
        y1={deep ? 98 : 86}
        x2="108"
        y2={deep ? 108 : 96}
        {...S}
      />

      <line
        x1="141"
        y1={deep ? 98 : 86}
        x2="168"
        y2={deep ? 108 : 95}
        {...S}
      />

      {!deep && (
        <Arrow
          x1="202"
          y1="55"
          x2="202"
          y2="112"
        />
      )}
    </DiagramShell>
  );
}

/* ======================================================
   LUNGE / GOLF
   ====================================================== */

function LungeTwist() {
  return (
    <DiagramShell label="Lunge with torso rotation">
      <Ground />

      <Head cx="136" cy="49" />

      <line
        x1="130"
        y1="58"
        x2="116"
        y2="103"
        {...S}
      />

      <line
        x1="116"
        y1="103"
        x2="82"
        y2="123"
        {...S}
      />

      <line
        x1="82"
        y1="123"
        x2="65"
        y2="157"
        {...S}
      />

      <line
        x1="116"
        y1="103"
        x2="153"
        y2="125"
        {...S}
      />

      <line
        x1="153"
        y1="125"
        x2="189"
        y2="157"
        {...S}
      />

      <line
        x1="124"
        y1="72"
        x2="87"
        y2="119"
        {...S}
      />

      <line
        x1="124"
        y1="71"
        x2="166"
        y2="30"
        {...S}
      />

      <ArcArrow
        path="M153 68 Q182 79 176 106"
        endX={176}
        endY={106}
        rotate={110}
      />
    </DiagramShell>
  );
}

function PracticeSwing() {
  return (
    <DiagramShell label="Golf practice swing">
      <Ground />

      <Head cx="117" cy="42" />

      <line
        x1="117"
        y1="52"
        x2="113"
        y2="103"
        {...S}
      />

      <line
        x1="113"
        y1="103"
        x2="91"
        y2="156"
        {...S}
      />

      <line
        x1="113"
        y1="103"
        x2="140"
        y2="156"
        {...S}
      />

      <line
        x1="112"
        y1="70"
        x2="148"
        y2="85"
        {...S}
      />

      <line
        x1="112"
        y1="70"
        x2="145"
        y2="91"
        {...S}
      />

      <line
        x1="147"
        y1="88"
        x2="72"
        y2="137"
        {...S}
        strokeWidth="3"
      />

      <ArcArrow
        path="M66 55 Q125 5 183 57"
        endX={183}
        endY={57}
        rotate={45}
      />
    </DiagramShell>
  );
}

/* ======================================================
   FLOOR / SPINE
   ====================================================== */

function CatCow() {
  return (
    <DiagramShell label="Cat cow spinal movement">
      <Ground />

      <Head cx="172" cy="79" />

      <path
        d="M163 87 Q125 59 82 88"
        {...S}
      />

      <line
        x1="86"
        y1="88"
        x2="68"
        y2="147"
        {...S}
      />

      <line
        x1="150"
        y1="88"
        x2="161"
        y2="147"
        {...S}
      />

      <line
        x1="85"
        y1="89"
        x2="107"
        y2="147"
        {...S}
      />

      <line
        x1="151"
        y1="89"
        x2="139"
        y2="147"
        {...S}
      />

      <ArcArrow
        path="M91 48 Q122 26 152 49"
        endX={152}
        endY={49}
        rotate={35}
      />
    </DiagramShell>
  );
}

function WindshieldWipers({
  hold = false,
}) {
  return (
    <DiagramShell
      label={
        hold
          ? "Windshield wiper hip hold"
          : "Lying windshield wipers"
      }
    >
      <Ground />

      <Head cx="58" cy="113" />

      <line
        x1="68"
        y1="113"
        x2="125"
        y2="113"
        {...S}
      />

      <line
        x1="86"
        y1="113"
        x2="63"
        y2="93"
        {...S}
      />

      <line
        x1="86"
        y1="113"
        x2="64"
        y2="132"
        {...S}
      />

      <path
        d="M125 113 L157 90 L191 110"
        {...S}
      />

      <path
        d="M125 113 L155 136 L190 126"
        {...S}
      />

      {!hold && (
        <ArcArrow
          path="M145 64 Q192 83 198 121"
          endX={198}
          endY={121}
          rotate={90}
        />
      )}

      {hold && (
        <path
          d="M171 79 Q193 96 194 119"
          {...S}
          strokeWidth="3"
          opacity="0.35"
        />
      )}
    </DiagramShell>
  );
}

function OpenBooks() {
  return (
    <DiagramShell label="Open book thoracic rotation">
      <Ground />

      <Head cx="61" cy="111" />

      <line
        x1="71"
        y1="111"
        x2="122"
        y2="111"
        {...S}
      />

      <path
        d="M122 111 L155 126 L187 126"
        {...S}
      />

      <line
        x1="97"
        y1="109"
        x2="142"
        y2="91"
        {...S}
      />

      <line
        x1="97"
        y1="109"
        x2="145"
        y2="61"
        {...S}
      />

      <ArcArrow
        path="M112 88 Q137 45 178 52"
        endX={178}
        endY={52}
        rotate={5}
      />
    </DiagramShell>
  );
}

function SupineTwist() {
  return (
    <DiagramShell label="Supine spinal twist">
      <Ground />

      <Head cx="55" cy="105" />

      <line
        x1="65"
        y1="105"
        x2="120"
        y2="105"
        {...S}
      />

      <line
        x1="83"
        y1="105"
        x2="73"
        y2="75"
        {...S}
      />

      <line
        x1="83"
        y1="105"
        x2="73"
        y2="136"
        {...S}
      />

      <path
        d="M120 105 Q149 112 161 137"
        {...S}
      />

      <path
        d="M120 105 Q147 118 176 133"
        {...S}
      />

      <ArcArrow
        path="M139 66 Q181 84 183 119"
        endX={183}
        endY={119}
        rotate={90}
      />
    </DiagramShell>
  );
}

function ChildPoseLat() {
  return (
    <DiagramShell label="Child pose lat stretch">
      <Ground />

      <Head cx="107" cy="94" />

      <path
        d="M100 101 Q84 117 78 139"
        {...S}
      />

      <path
        d="M80 139 Q112 145 140 128"
        {...S}
      />

      <line
        x1="101"
        y1="102"
        x2="156"
        y2="130"
        {...S}
      />

      <line
        x1="102"
        y1="102"
        x2="165"
        y2="117"
        {...S}
      />

      <Arrow
        x1="183"
        y1="101"
        x2="199"
        y2="88"
      />
    </DiagramShell>
  );
}

/* ======================================================
   QUADRUPED / ADDUCTOR
   ====================================================== */

function Ad
