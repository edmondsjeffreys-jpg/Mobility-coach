import React from "react";

const lineProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Diagram({ children, label }) {
  return (
    <div
      className="svgDiagram"
      role="img"
      aria-label={label}
    >
      <svg
        viewBox="0 0 240 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </div>
  );
}

function Head({ x, y, r = 9 }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      {...lineProps}
    />
  );
}

function Ground() {
  return (
    <line
      x1="20"
      y1="145"
      x2="220"
      y2="145"
      {...lineProps}
      strokeWidth="2"
      opacity="0.18"
    />
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  direction = "right",
}) {
  let points = "";

  if (direction === "right") {
    points = `${x2 - 8},${y2 - 6} ${x2},${y2} ${x2 - 8},${y2 + 6}`;
  }

  if (direction === "left") {
    points = `${x2 + 8},${y2 - 6} ${x2},${y2} ${x2 + 8},${y2 + 6}`;
  }

  if (direction === "up") {
    points = `${x2 - 6},${y2 + 8} ${x2},${y2} ${x2 + 6},${y2 + 8}`;
  }

  if (direction === "down") {
    points = `${x2 - 6},${y2 - 8} ${x2},${y2} ${x2 + 6},${y2 - 8}`;
  }

  return (
    <g opacity="0.5">
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        {...lineProps}
        strokeWidth="3"
      />

      <polyline
        points={points}
        {...lineProps}
        strokeWidth="3"
      />
    </g>
  );
}

function CurvedArrow({
  d,
  endX,
  endY,
  rotate = 0,
}) {
  return (
    <g opacity="0.5">
      <path
        d={d}
        {...lineProps}
        strokeWidth="3"
      />

      <g
        transform={`translate(${endX} ${endY}) rotate(${rotate})`}
      >
        <polyline
          points="-8,-6 0,0 -8,6"
          {...lineProps}
          strokeWidth="3"
        />
      </g>
    </g>
  );
}

function ChinTuckDiagram() {
  return (
    <Diagram label="Chin tuck and neck stretch">
      <Ground />
      <Head x={115} y={31} />

      <line x1="115" y1="40" x2="115" y2="94" {...lineProps} />
      <line x1="115" y1="58" x2="92" y2="82" {...lineProps} />
      <line x1="115" y1="58" x2="139" y2="82" {...lineProps} />
      <line x1="115" y1="94" x2="98" y2="144" {...lineProps} />
      <line x1="115" y1="94" x2="132" y2="144" {...lineProps} />

      <Arrow
        x1={161}
        y1={31}
        x2={137}
        y2={31}
        direction="left"
      />
    </Diagram>
  );
}

function SideBendDiagram() {
  return (
    <Diagram label="Standing overhead side bend">
      <Ground />
      <Head x={110} y={35} />

      <path d="M110 44 Q106 78 95 101" {...lineProps} />
      <line x1="95" y1="101" x2="80" y2="144" {...lineProps} />
      <line x1="95" y1="101" x2="111" y2="144" {...lineProps} />

      <path d="M108 58 Q88 38 79 17" {...lineProps} />
      <path d="M112 57 Q98 33 93 12" {...lineProps} />

      <CurvedArrow
        d="M148 48 Q165 69 151 92"
        endX={151}
        endY={92}
        rotate={105}
      />
    </Diagram>
  );
}

function StandingRotationDiagram({ golf = false }) {
  return (
    <Diagram
      label={
        golf
          ? "Standing golf rotation"
          : "Standing torso rotation"
      }
    >
      <Ground />
      <Head x={120} y={27} />

      <line x1="120" y1="36" x2="120" y2="95" {...lineProps} />
      <line x1="120" y1="55" x2="77" y2="60" {...lineProps} />
      <line x1="120" y1="55" x2="164" y2="50" {...lineProps} />

      <line x1="120" y1="95" x2="101" y2="144" {...lineProps} />
      <line x1="120" y1="95" x2="140" y2="144" {...lineProps} />

      {golf && (
        <line
          x1="72"
          y1="60"
          x2="174"
          y2="49"
          {...lineProps}
          strokeWidth="2"
          opacity="0.35"
        />
      )}

      <CurvedArrow
        d="M73 31 Q120 3 169 31"
        endX={169}
        endY={31}
        rotate={35}
      />
    </Diagram>
  );
}

function WallSlideDiagram() {
  return (
    <Diagram label="Wall slide">
      <Ground />

      <line
        x1="65"
        y1="10"
        x2="65"
        y2="145"
        {...lineProps}
        strokeWidth="3"
        opacity="0.25"
      />

      <Head x={100} y={35} />

      <line x1="93" y1="43" x2="92" y2="97" {...lineProps} />
      <line x1="92" y1="97" x2="79" y2="144" {...lineProps} />
      <line x1="92" y1="97" x2="106" y2="144" {...lineProps} />

      <path d="M92 57 L75 43 L71 18" {...lineProps} />
      <path d="M94 57 L112 42 L119 17" {...lineProps} />

      <Arrow
        x1={150}
        y1={105}
        x2={150}
        y2={45}
        direction="up"
      />
    </Diagram>
  );
}

function CalfRaiseDiagram({ withRock = false }) {
  return (
    <Diagram label="Calf raise and ankle rocks">
      <Ground />
      <Head x={112} y={29} />

      <line x1="112" y1="38" x2="112" y2="93" {...lineProps} />
      <line x1="112" y1="55" x2="91" y2="78" {...lineProps} />
      <line x1="112" y1="55" x2="134" y2="78" {...lineProps} />
      <line x1="112" y1="93" x2="97" y2="137" {...lineProps} />
      <line x1="112" y1="93" x2="129" y2="137" {...lineProps} />
      <line x1="97" y1="137" x2="108" y2="142" {...lineProps} />
      <line x1="129" y1="137" x2="141" y2="142" {...lineProps} />

      <Arrow
        x1={166}
        y1={130}
        x2={166}
        y2={92}
        direction="up"
      />

      {withRock && (
        <CurvedArrow
          d="M57 119 Q42 133 58 141"
          endX={58}
          endY={141}
          rotate={20}
        />
      )}
    </Diagram>
  );
}

function SingleLegBalanceDiagram() {
  return (
    <Diagram label="Single leg balance">
      <Ground />
      <Head x={116} y={27} />

      <line x1="116" y1="36" x2="116" y2="90" {...lineProps} />
      <line x1="116" y1="52" x2="86" y2="70" {...lineProps} />
      <line x1="116" y1="52" x2="146" y2="70" {...lineProps} />
      <line x1="116" y1="90" x2="108" y2="144" {...lineProps} />

      <path d="M116 91 Q143 102 140 128" {...lineProps} />

      <path
        d="M91 25 Q73 42 91 61"
        {...lineProps}
        strokeWidth="2"
        opacity="0.2"
      />

      <path
        d="M141 25 Q159 42 141 61"
        {...lineProps}
        strokeWidth="2"
        opacity="0.2"
      />
    </Diagram>
  );
}

function SquatDiagram({ deep = false }) {
  return (
    <Diagram
      label={
        deep
          ? "Deep squat hold"
          : "Bodyweight squat"
      }
    >
      <Ground />

      {!deep && (
        <g opacity="0.18">
          <Head x={65} y={25} />
          <line x1="65" y1="34" x2="65" y2="89" {...lineProps} />
          <line x1="65" y1="89" x2="51" y2="144" {...lineProps} />
          <line x1="65" y1="89" x2="79" y2="144" {...lineProps} />
        </g>
      )}

      <Head x={150} y={deep ? 68 : 53} />

      <path
        d={
          deep
            ? "M145 77 Q132 94 121 108"
            : "M146 62 Q137 78 131 94"
        }
        {...lineProps}
      />

      <path
        d={
          deep
            ? "M121 108 L93 123 L78 144"
            : "M131 94 L108 116 L94 144"
        }
        {...lineProps}
      />

      <path
        d={
          deep
            ? "M121 108 L151 122 L170 144"
            : "M131 94 L158 115 L177 144"
        }
        {...lineProps}
      />

      <line
        x1="139"
        y1={deep ? 90 : 75}
        x2="108"
        y2={deep ? 101 : 88}
        {...lineProps}
      />

      <line
        x1="139"
        y1={deep ? 90 : 75}
        x2="167"
        y2={deep ? 101 : 87}
        {...lineProps}
      />

      {!deep && (
        <Arrow
          x1={207}
          y1={44}
          x2={207}
          y2={105}
          direction="down"
        />
      )}
    </Diagram>
  );
}

function CatCowDiagram() {
  return (
    <Diagram label="Cat cow">
      <Ground />
      <Head x={170} y={68} />

      <path d="M162 76 Q124 48 83 78" {...lineProps} />
      <line x1="87" y1="78" x2="69" y2="136" {...lineProps} />
      <line x1="149" y1="79" x2="161" y2="136" {...lineProps} />
      <line x1="87" y1="79" x2="107" y2="136" {...lineProps} />
      <line x1="149" y1="79" x2="139" y2="136" {...lineProps} />

      <CurvedArrow
        d="M91 40 Q121 20 151 41"
        endX={151}
        endY={41}
        rotate={35}
      />
    </Diagram>
  );
}

function WindshieldWipersDiagram({ hold = false }) {
  return (
    <Diagram
      label={
        hold
          ? "Windshield wiper hold"
          : "Lying windshield wipers"
      }
    >
      <Ground />
      <Head x={54} y={104} />

      <line x1="64" y1="104" x2="121" y2="104" {...lineProps} />
      <line x1="83" y1="104" x2="63" y2="84" {...lineProps} />
      <line x1="83" y1="104" x2="63" y2="124" {...lineProps} />

      <path d="M121 104 L155 81 L190 101" {...lineProps} />
      <path d="M121 104 L154 128 L190 118" {...lineProps} />

      {!hold && (
        <CurvedArrow
          d="M145 55 Q191 75 198 111"
          endX={198}
          endY={111}
          rotate={90}
        />
      )}
    </Diagram>
  );
}

function OpenBookDiagram() {
  return (
    <Diagram label="Open book thoracic rotation">
      <Ground />
      <Head x={60} y={104} />

      <line x1="69" y1="104" x2="121" y2="104" {...lineProps} />
      <path d="M121 104 L153 119 L187 119" {...lineProps} />

      <line x1="95" y1="103" x2="143" y2="86" {...lineProps} />
      <line x1="95" y1="103" x2="145" y2="54" {...lineProps} />

      <CurvedArrow
        d="M112 80 Q137 39 178 47"
        endX={178}
        endY={47}
        rotate={5}
      />
    </Diagram>
  );
}

function SupineTwistDiagram() {
  return (
    <Diagram label="Supine spinal twist">
      <Ground />
      <Head x={54} y={98} />

      <line x1="64" y1="98" x2="120" y2="98" {...lineProps} />
      <line x1="82" y1="98" x2="72" y2="69" {...lineProps} />
      <line x1="82" y1="98" x2="72" y2="128" {...lineProps} />

      <path d="M120 98 Q149 107 162 132" {...lineProps} />
      <path d="M120 98 Q148 112 177 128" {...lineProps} />

      <CurvedArrow
        d="M139 58 Q181 77 184 111"
        endX={184}
        endY={111}
        rotate={90}
      />
    </Diagram>
  );
}

function ChildPoseDiagram() {
  return (
    <Diagram label="Child pose lat stretch">
      <Ground />
      <Head x={108} y={86} />

      <path d="M101 93 Q84 109 78 131" {...lineProps} />
      <path d="M80 131 Q111 138 140 120" {...lineProps} />

      <line x1="101" y1="94" x2="158" y2="123" {...lineProps} />
      <line x1="102" y1="94" x2="167" y2="110" {...lineProps} />

      <Arrow
        x1={181}
        y1={95}
        x2={201}
        y2={84}
        direction="right"
      />
    </Diagram>
  );
}

function LungeTwistDiagram() {
  return (
    <Diagram label="Lunge with torso rotation">
      <Ground />
      <Head x={137} y={40} />

      <line x1="131" y1="49" x2="116" y2="94" {...lineProps} />
      <line x1="116" y1="94" x2="83" y2="114" {...lineProps} />
      <line x1="83" y1="114" x2="65" y2="144" {...lineProps} />
      <line x1="116" y1="94" x2="153" y2="116" {...lineProps} />
      <line x1="153" y1="116" x2="190" y2="144" {...lineProps} />

      <line x1="124" y1="62" x2="87" y2="111" {...lineProps} />
      <line x1="124" y1="62" x2="166" y2="21" {...lineProps} />

      <CurvedArrow
        d="M152 59 Q181 70 177 98"
        endX={177}
        endY={98}
        rotate={105}
      />
    </Diagram>
  );
}

function AdductorRockbackDiagram() {
  return (
    <Diagram label="Quadruped adductor rock back">
      <Ground />
      <Head x={158} y={68} />

      <path d="M149 76 Q120 82 94 91" {...lineProps} />

      <line x1="145" y1="82" x2="163" y2="136" {...lineProps} />
      <line x1="126" y1="84" x2="119" y2="136" {...lineProps} />
      <line x1="95" y1="91" x2="71" y2="136" {...lineProps} />
      <line x1="96" y1="91" x2="39" y2="125" {...lineProps} />

      <Arrow
        x1={181}
        y1={94}
        x2={132}
        y2={94}
        direction="left"
      />

      <CurvedArrow
        d="M72 66 Q89 51 107 65"
        endX={107}
        endY={65}
        rotate={25}
      />
    </Diagram>
  );
}

function PushupDiagram() {
  return (
    <Diagram label="Push up">
      <Ground />
      <Head x={178} y={80} />

      <line x1="168" y1="84" x2="91" y2="105" {...lineProps} />
      <line x1="91" y1="105" x2="49" y2="136" {...lineProps} />
      <line x1="143" y1="91" x2="157" y2="137" {...lineProps} />
      <line x1="157" y1="137" x2="180" y2="137" {...lineProps} />

      <Arrow
        x1={205}
        y1={65}
        x2={205}
        y2={113}
        direction="down"
      />
    </Diagram>
  );
}

function NeckStretchDiagram() {
  return (
    <Diagram label="Neck side stretch">
      <Ground />
      <Head x={109} y={31} />

      <path d="M109 40 Q114 47 119 49" {...lineProps} />
      <line x1="119" y1="49" x2="119" y2="94" {...lineProps} />
      <line x1="119" y1="60" x2="94" y2="84" {...lineProps} />
      <line x1="119" y1="60" x2="144" y2="84" {...lineProps} />
      <line x1="119" y1="94" x2="102" y2="144" {...lineProps} />
      <line x1="119" y1="94" x2="136" y2="144" {...lineProps} />

      <CurvedArrow
        d="M82 26 Q73 43 87 54"
        endX={87}
        endY={54}
        rotate={45}
      />
    </Diagram>
  );
}

function DoorwayPecDiagram() {
  return (
    <Diagram label="Doorway chest stretch">
      <Ground />

      <line
        x1="66"
        y1="10"
        x2="66"
        y2="145"
        {...lineProps}
        strokeWidth="3"
        opacity="0.25"
      />

      <Head x={112} y={31} />

      <line x1="112" y1="40" x2="112" y2="94" {...lineProps} />
      <path d="M111 56 L82 55 L67 38" {...lineProps} />
      <line x1="112" y1="94" x2="95" y2="144" {...lineProps} />
      <line x1="112" y1="94" x2="137" y2="144" {...lineProps} />

      <CurvedArrow
        d="M144 57 Q168 67 169 90"
        endX={169}
        endY={90}
        rotate={90}
      />
    </Diagram>
  );
}

function SeatedRotationDiagram() {
  return (
    <Diagram label="Seated thoracic rotation">
      <line
        x1="65"
        y1="110"
        x2="163"
        y2="110"
        {...lineProps}
        strokeWidth="3"
        opacity="0.25"
      />

      <line
        x1="94"
        y1="110"
        x2="94"
        y2="145"
        {...lineProps}
        strokeWidth="3"
        opacity="0.25"
      />

      <Head x={111} y={35} />

      <line x1="111" y1="44" x2="111" y2="95" {...lineProps} />
      <line x1="111" y1="61" x2="82" y2="65" {...lineProps} />
      <line x1="111" y1="61" x2="141" y2="57" {...lineProps} />

      <path d="M111 95 L137 111 L137 144" {...lineProps} />
      <path d="M111 95 L88 111 L88 144" {...lineProps} />

      <CurvedArrow
        d="M72 28 Q112 4 154 29"
        endX={154}
        endY={29}
        rotate={35}
      />
    </Diagram>
  );
}

function HipFlexorDiagram() {
  return (
    <Diagram label="Standing hip flexor stretch">
      <Ground />
      <Head x={118} y={28} />

      <line x1="118" y1="37" x2="116" y2="90" {...lineProps} />
      <line x1="116" y1="55" x2="95" y2="79" {...lineProps} />
      <line x1="116" y1="55" x2="137" y2="79" {...lineProps} />

      <path d="M116 90 L91 112 L72 144" {...lineProps} />
      <path d="M116 90 L142 110 L174 144" {...lineProps} />

      <Arrow
        x1={194}
        y1={81}
        x2={174}
        y2={81}
        direction="left"
      />
    </Diagram>
  );
}

function KneeWallDiagram({ desk = false }) {
  return (
    <Diagram
      label={
        desk
          ? "Desk supported ankle rock"
          : "Knee to wall ankle rock"
      }
    >
      <Ground />

      <line
        x1="184"
        y1="25"
        x2="184"
        y2="145"
        {...lineProps}
        strokeWidth="3"
        opacity="0.25"
      />

      {desk && (
        <line
          x1="166"
          y1="70"
          x2="215"
          y2="70"
          {...lineProps}
          strokeWidth="3"
          opacity="0.3"
        />
      )}

      <Head x={112} y={36} />

      <line x1="112" y1="45" x2="108" y2="89" {...lineProps} />
      <path d="M108 89 L139 112 L164 138" {...lineProps} />
      <path d="M108 89 L89 113 L77 144" {...lineProps} />

      <line x1="77" y1="144" x2="101" y2="144" {...lineProps} />
      <line x1="164" y1="138" x2="180" y2="144" {...lineProps} />
      <line
        x1="107"
        y1="61"
        x2="143"
        y2={desk ? 70 : 82}
        {...lineProps}
      />

      <Arrow
        x1={133}
        y1={105}
        x2={165}
        y2={105}
        direction="right"
      />
    </Diagram>
  );
}

function LateralShiftDiagram() {
  return (
    <Diagram label="Lateral weight shifts">
      <Ground />
      <Head x={120} y={41} />

      <line x1="120" y1="50" x2="120" y2="94" {...lineProps} />
      <line x1="120" y1="62" x2="92" y2="79" {...lineProps} />
      <line x1="120" y1="62" x2="149" y2="79" {...lineProps} />

      <path d="M120 94 L84 112 L61 144" {...lineProps} />
      <path d="M120 94 L157 112 L180 144" {...lineProps} />

      <Arrow
        x1={75}
        y1={34}
        x2={164}
        y2={34}
        direction="right"
      />

      <Arrow
        x1={164}
        y1={23}
        x2={75}
        y2={23}
        direction="left"
      />
    </Diagram>
  );
}

function HipRotationDiagram() {
  return (
    <Diagram label="Dynamic hip rotation">
      <Ground />
      <Head x={120} y={28} />

      <line x1="120" y1="37" x2="120" y2="93" {...lineProps} />
      <line x1="120" y1="54" x2="94" y2="77" {...lineProps} />
      <line x1="120" y1="54" x2="146" y2="77" {...lineProps} />
      <line x1="120" y1="93" x2="100" y2="144" {...lineProps} />
      <line x1="120" y1="93" x2="141" y2="144" {...lineProps} />

      <CurvedArrow
        d="M84 87 Q120 116 158 88"
        endX={158}
        endY={88}
        rotate={-35}
      />
    </Diagram>
  );
}

function PracticeSwingDiagram() {
  return (
    <Diagram label="Slow golf practice swing">
      <Ground />
      <Head x={116} y={33} />

      <line x1="116" y1="42" x2="112" y2="93" {...lineProps} />
      <line x1="112" y1="93" x2="91" y2="144" {...lineProps} />
      <line x1="112" y1="93" x2="140" y2="144" {...lineProps} />

      <line x1="112" y1="61" x2="146" y2="77" {...lineProps} />
      <line x1="112" y1="61" x2="143" y2="84" {...lineProps} />

      <line
        x1="145"
        y1="80"
        x2="72"
        y2="128"
        {...lineProps}
        strokeWidth="3"
      />

      <CurvedArrow
        d="M67 48 Q124 2 182 50"
        endX={182}
        endY={50}
        rotate={45}
      />
    </Diagram>
  );
}

function GenericDiagram({ name }) {
  return (
    <Diagram label={name || "Mobility exercise"}>
      <Ground />
      <Head x={120} y={29} />

      <line x1="120" y1="38" x2="120" y2="94" {...lineProps} />
      <line x1="120" y1="55" x2="91" y2="80" {...lineProps} />
      <line x1="120" y1="55" x2="149" y2="80" {...lineProps} />
      <line x1="120" y1="94" x2="100" y2="144" {...lineProps} />
      <line x1="120" y1="94" x2="140" y2="144" {...lineProps} />

      <CurvedArrow
        d="M74 36 Q120 5 168 36"
        endX={168}
        endY={36}
        rotate={35}
      />
    </Diagram>
  );
}

const diagramMap = {
  "/exercises/chin-tuck-neck-stretch.png":
    ChinTuckDiagram,

  "/exercises/chin-tuck.png":
    ChinTuckDiagram,

  "/exercises/standing-side-bend.png":
    SideBendDiagram,

  "/exercises/standing-torso-rotation.png":
    StandingRotationDiagram,

  "/exercises/bodyweight-squat.png":
    SquatDiagram,

  "/exercises/deep-squat-hold.png":
    () => <SquatDiagram deep />,

  "/exercises/worlds-greatest-stretch.png":
    LungeTwistDiagram,

  "/exercises/low-lunge-twist.png":
    LungeTwistDiagram,

  "/exercises/cat-cow.png":
    CatCowDiagram,

  "/exercises/wall-slides.png":
    WallSlideDiagram,

  "/exercises/calf-raise-ankle-rock.png":
    () => <CalfRaiseDiagram withRock />,

  "/exercises/calf-raise.png":
    CalfRaiseDiagram,

  "/exercises/knee-to-wall.png":
    KneeWallDiagram,

  "/exercises/desk-ankle-rock.png":
    () => <KneeWallDiagram desk />,

  "/exercises/windshield-wipers.png":
    WindshieldWipersDiagram,

  "/exercises/windshield-wiper-hold.png":
    () => <WindshieldWipersDiagram hold />,

  "/exercises/adductor-rockback.png":
    AdductorRockbackDiagram,

  "/exercises/open-books.png":
    OpenBookDiagram,

  "/exercises/push-up.png":
    PushupDiagram,

  "/exercises/neck-release.png":
    NeckStretchDiagram,

  "/exercises/upper-trap-stretch.png":
    NeckStretchDiagram,

  "/exercises/childs-pose-lat.png":
    ChildPoseDiagram,

  "/exercises/supine-spinal-twist.png":
    SupineTwistDiagram,

  "/exercises/doorway-pec.png":
    DoorwayPecDiagram,

  "/exercises/seated-thoracic-rotation.png":
    SeatedRotationDiagram,

  "/exercises/standing-hip-flexor.png":
    HipFlexorDiagram,

  "/exercises/golf-rotation.png":
    () => <StandingRotationDiagram golf />,

  "/exercises/practice-swing.png":
    PracticeSwingDiagram,

  "/exercises/lateral-weight-shift.png":
    LateralShiftDiagram,

  "/exercises/hip-rotation.png":
    HipRotationDiagram,

  "/exercises/single-leg-balance.png":
    SingleLegBalanceDiagram,
};

export function ExerciseDiagram({
  image,
  name,
}) {
  const Component =
    diagramMap[image];

  if (!Component) {
    return (
      <GenericDiagram
        name={name}
      />
    );
  }

  return <Component />;
}

export default ExerciseDiagram;
