export const routines = {
  Morning: [
    {
      id: "morning-chin-tucks",
      name: "Chin tucks + neck side stretch",
      type: "timer",
      target: 30,
      unit: "sec",
      sideSpecific: false,
      tags: ["neck", "posture"],
      core: false,
      quickPriority: 3,
      breathing:
        "Exhale into the tuck or side stretch. Inhale back to neutral.",
      instructions:
        "Stand tall. Draw your chin straight back without looking down. Then gently tilt one ear toward the shoulder.",
      image: "/exercises/chin-tuck-neck-stretch.png",
    },
    {
      id: "morning-side-bend",
      name: "Standing reach + side bend",
      type: "timer",
      target: 25,
      unit: "sec",
      sideSpecific: true,
      tags: ["spine", "shoulders", "general-mobility"],
      core: false,
      quickPriority: 4,
      breathing:
        "Inhale reaching tall. Exhale into each side bend.",
      instructions:
        "Reach both arms overhead. Alternate gentle side bends. Think tall, not deep.",
      image: "/exercises/standing-side-bend.png",
    },
    {
      id: "morning-torso-rotation",
      name: "Standing torso rotations",
      type: "timer",
      target: 35,
      unit: "sec",
      sideSpecific: false,
      tags: ["thoracic", "hips", "golf"],
      core: true,
      quickPriority: 1,
      breathing:
        "Keep breathing rhythmically. Exhale into each rotation.",
      instructions:
        "Feet shoulder-width apart with soft knees. Rotate left and right with relaxed arms and let the hips move naturally.",
      image: "/exercises/standing-torso-rotation.png",
    },
    {
      id: "morning-squat",
      name: "Bodyweight squats",
      type: "reps",
      target: 10,
      unit: "reps",
      sideSpecific: false,
      tags: ["hips", "ankles", "legs", "strength"],
      core: true,
      quickPriority: 1,
      breathing:
        "Inhale on the way down. Exhale as you stand.",
      instructions:
        "Feet about shoulder width. Sit hips back and down through a comfortable range.",
      image: "/exercises/bodyweight-squat.png",
    },
    {
      id: "morning-worlds-greatest",
      name: "World's Greatest Stretch + twist",
      type: "reps",
      target: 2,
      unit: "per side",
      sideSpecific: true,
      tags: ["hips", "thoracic", "shoulders", "golf"],
      core: true,
      quickPriority: 1,
      breathing:
        "Inhale to lengthen. Exhale as you rotate and look up.",
      instructions:
        "Step into a long lunge. Put the inside hand on the floor, rotate the opposite arm toward the ceiling, and look up.",
      image: "/exercises/worlds-greatest-stretch.png",
    },
    {
      id: "morning-cat-cow",
      name: "Cat-cow",
      type: "reps",
      target: 8,
      unit: "reps",
      sideSpecific: false,
      tags: ["spine", "back"],
      core: false,
      quickPriority: 3,
      breathing:
        "Inhale into cow. Exhale into cat.",
      instructions:
        "On hands and knees, slowly extend and round the spine with your breath.",
      image: "/exercises/cat-cow.png",
    },
    {
      id: "morning-wall-slides",
      name: "Wall slides",
      type: "reps",
      target: 8,
      unit: "reps",
      sideSpecific: false,
      tags: ["shoulders", "upper-back"],
      core: true,
      quickPriority: 2,
      breathing:
        "Inhale sliding up. Exhale returning down.",
      instructions:
        "Keep your back and head against the wall. Slide your arms upward only as far as comfortable.",
      image: "/exercises/wall-slides.png",
    },
    {
      id: "morning-ankles",
      name: "Calf raises + ankle rocks",
      type: "reps",
      target: 10,
      unit: "each",
      sideSpecific: false,
      tags: ["ankles", "calves", "snowboarding"],
      core: true,
      quickPriority: 1,
      breathing:
        "Calf raise: exhale up, inhale down. Ankle rock: exhale forward, inhale back.",
      instructions:
        "Do 10 calf raises followed by 10 gentle ankle rocks.",
      image: "/exercises/calf-raise-ankle-rock.png",
    },
  ],

  Night: [
    {
      id: "night-knee-wall",
      name: "Knee-to-wall ankle rocks",
      type: "timer",
      target: 45,
      unit: "sec per side",
      sideSpecific: true,
      tags: ["ankles", "dorsiflexion", "snowboarding"],
      core: true,
      quickPriority: 1,
      breathing:
        "Inhale back. Exhale as the knee travels forward.",
      instructions:
        "Keep the heel flat. Drive the knee forward over the toes, then rock back.",
      image: "/exercises/knee-to-wall.png",
    },
    {
      id: "night-wipers",
      name: "Lying windshield wipers",
      type: "reps",
      target: 10,
      unit: "per side",
      sideSpecific: true,
      tags: ["hips", "spine"],
      core: true,
      quickPriority: 1,
      breathing:
        "Inhale at centre. Exhale as the knees fall to either side.",
      instructions:
        "Lie on your back with knees bent. Let both knees fall side to side while keeping the shoulders down.",
      image: "/exercises/windshield-wipers.png",
    },
    {
      id: "night-squat",
      name: "Bodyweight squats",
      type: "reps",
      target: 15,
      unit: "reps",
      sideSpecific: false,
      tags: ["hips", "ankles", "legs", "strength"],
      core: true,
      quickPriority: 1,
      breathing:
        "Inhale down. Exhale as you stand.",
      instructions:
        "Sit hips back and down through a comfortable range while keeping the feet planted.",
      image: "/exercises/bodyweight-squat.png",
    },
    {
      id: "night-deep-squat",
      name: "Deep squat hold",
      type: "timer",
      target: 30,
      unit: "sec",
      sideSpecific: false,
      tags: ["hips", "ankles", "groin"],
      core: true,
      quickPriority: 2,
      breathing:
        "Slow inhale into the belly and ribs. Long exhale and relax deeper.",
      instructions:
        "Settle into a comfortable deep squat. Keep the chest tall and feet planted.",
      image: "/exercises/deep-squat-hold.png",
    },
    {
      id: "night-open-books",
      name: "Open Books",
      type: "reps",
      target: 5,
      unit: "per side",
      sideSpecific: true,
      tags: ["thoracic", "golf", "shoulders"],
      core: true,
      quickPriority: 1,
      breathing:
        "Inhale to prepare. Long exhale while rotating open.",
      instructions:
        "Lie on your side with knees stacked. Rotate the top arm and chest open. Let your eyes follow the hand.",
      image: "/exercises/open-books.png",
    },
    {
      id: "night-lunge-twist",
      name: "Low-lunge torso twist",
      type: "reps",
      target: 5,
      unit: "per side",
      sideSpecific: true,
      tags: ["hips", "thoracic", "shoulders", "golf"],
      core: true,
      quickPriority: 2,
      breathing:
        "Inhale to lengthen. Exhale as you rotate and look up.",
      instructions:
        "Put the inside hand down, rotate the chest open, reach the other arm up, and look toward the hand.",
      image: "/exercises/low-lunge-twist.png",
    },
    {
      id: "night-pushups",
      name: "Push-ups",
      type: "reps",
      target: 12,
      unit: "reps",
      sideSpecific: false,
      tags: ["strength", "chest", "shoulders", "core"],
      core: true,
      quickPriority: 3,
      breathing:
        "Inhale down. Exhale while pushing up.",
      instructions:
        "Keep your body in one line. Lower under control and stop before failure.",
      image: "/exercises/push-up.png",
    },
    {
      id: "night-wall-slides",
      name: "Wall slides",
      type: "reps",
      target: 8,
      unit: "reps",
      sideSpecific: false,
      tags: ["shoulders", "upper-back"],
      core: true,
      quickPriority: 2,
      breathing:
        "Inhale sliding upward. Exhale coming down.",
      instructions:
        "Keep your back and head against the wall. Slide your arms upward only as far as comfortable.",
      image: "/exercises/wall-slides.png",
    },
    {
      id: "night-neck",
      name: "Neck release",
      type: "timer",
      target: 25,
      unit: "sec per side",
      sideSpecific: true,
      tags: ["neck", "shoulders"],
      core: false,
      quickPriority: 3,
      breathing:
        "Inhale in neutral. Exhale gently into the stretch.",
      instructions:
        "Use only very light pressure. Stretch the upper trap and levator area without forcing the neck.",
      image: "/exercises/neck-release.png",
    },
    {
      id: "night-lat",
      name: "Child's-pose lat stretch",
      type: "timer",
      target: 45,
      unit: "sec per side",
      sideSpecific: true,
      tags: ["shoulders", "lats", "spine"],
      core: true,
      quickPriority: 2,
      breathing:
        "Breathe into the stretched-side ribs. Use a long exhale to soften.",
      instructions:
        "Sit the hips back and walk the hands slightly to one side until you feel the opposite lat.",
      image: "/exercises/childs-pose-lat.png",
    },
    {
      id: "night-wiper-hold",
      name: "Windshield-wiper hold",
      type: "timer",
      target: 40,
      unit: "sec",
      sideSpecific: true,
      tags: ["hips", "spine"],
      core: false,
      quickPriority: 3,
      breathing:
        "Use about a 4-second inhale and 6-second exhale.",
      instructions:
        "Drop the knees to one side and allow the hips to relax without forcing the range.",
      image: "/exercises/windshield-wiper-hold.png",
    },
    {
      id: "night-spinal-twist",
      name: "Supine spinal twist",
      type: "timer",
      target: 40,
      unit: "sec per side",
      sideSpecific: true,
      tags: ["lower-back", "spine", "hips"],
      core: true,
      quickPriority: 2,
      breathing:
        "Use a 4-second inhale and 6-second exhale. Soften on every exhale.",
      instructions:
        "Bring the knees slightly toward the chest, let them fall together to one side, and keep the shoulders relaxed toward the floor.",
      image: "/exercises/supine-spinal-twist.png",
    },
  ],

  Office: [
    {
      id: "office-chin-tucks",
      name: "Chin tucks",
      type: "reps",
      target: 8,
      unit: "reps",
      sideSpecific: false,
      tags: ["neck", "posture"],
      core: true,
      quickPriority: 1,
      breathing:
        "Exhale as you draw the chin back. Inhale to release.",
      instructions:
        "Sit or stand tall and slide your head straight back as if making a gentle double chin.",
      image: "/exercises/chin-tuck.png",
    },
    {
      id: "office-neck",
      name: "Upper-trap neck stretch",
      type: "timer",
      target: 20,
      unit: "sec per side",
      sideSpecific: true,
      tags: ["neck", "shoulders"],
      core: false,
      quickPriority: 2,
      breathing:
        "Slow inhale. Longer exhale as the shoulder relaxes.",
      instructions:
        "Bring one ear gently toward the same-side shoulder while keeping the opposite shoulder heavy.",
      image: "/exercises/upper-trap-stretch.png",
    },
    {
      id: "office-pec",
      name: "Doorway pec opener",
      type: "timer",
      target: 25,
      unit: "sec per side",
      sideSpecific: true,
      tags: ["chest", "shoulders"],
      core: false,
      quickPriority: 2,
      breathing:
        "Inhale tall. Exhale as you rotate away.",
      instructions:
        "Place your forearm against a doorway or wall edge and gently turn away until you feel the chest and front shoulder.",
      image: "/exercises/doorway-pec.png",
    },
    {
      id: "office-thoracic",
      name: "Seated thoracic rotation",
      type: "reps",
      target: 5,
      unit: "per side",
      sideSpecific: true,
      tags: ["thoracic", "spine", "golf"],
      core: true,
      quickPriority: 1,
      breathing:
        "Inhale tall. Exhale into the rotation.",
      instructions:
        "Sit tall with feet planted. Rotate your chest toward one side without forcing the low back.",
      image: "/exercises/seated-thoracic-rotation.png",
    },
    {
      id: "office-hip-flexor",
      name: "Standing hip-flexor reset",
      type: "timer",
      target: 20,
      unit: "sec per side",
      sideSpecific: true,
      tags: ["hips"],
      core: true,
      quickPriority: 1,
      breathing:
        "Inhale tall. Exhale as you gently tuck the pelvis.",
      instructions:
        "Take a split stance, squeeze the back-side glute, and gently tuck the pelvis.",
      image: "/exercises/standing-hip-flexor.png",
    },
    {
      id: "office-ankle",
      name: "Desk-supported ankle rocks",
      type: "reps",
      target: 10,
      unit: "per side",
      sideSpecific: true,
      tags: ["ankles"],
      core: true,
      quickPriority: 1,
      breathing:
        "Exhale forward. Inhale back.",
      instructions:
        "Hold the desk lightly. Keep the heel down and drive the knee forward over the toes.",
      image: "/exercises/desk-ankle-rock.png",
    },
  ],

  "Pre-Golf": [
    {
      id: "golf-wipers",
      name: "Dynamic windshield wipers",
      type: "reps",
      target: 8,
      unit: "per side",
      sideSpecific: true,
      tags: ["hips", "golf"],
      core: true,
      quickPriority: 1,
      breathing:
        "Inhale at centre. Exhale as the knees move to the side.",
      instructions:
        "Use a smooth rhythm and stay out of long holds. The goal is to wake up hip rotation.",
      image: "/exercises/windshield-wipers.png",
    },
    {
      id: "golf-squat",
      name: "Bodyweight squats",
      type: "reps",
      target: 10,
      unit: "reps",
      sideSpecific: false,
      tags: ["hips", "ankles", "legs", "golf"],
      core: true,
      quickPriority: 1,
      breathing:
        "Inhale down. Exhale standing up.",
      instructions:
        "Use a smooth tempo and comfortable depth to warm the lower body.",
      image: "/exercises/bodyweight-squat.png",
    },
    {
      id: "golf-lunge-twist",
      name: "World's Greatest Stretch + twist",
      type: "reps",
      target: 3,
      unit: "per side",
      sideSpecific: true,
      tags: ["hips", "thoracic", "shoulders", "golf"],
      core: true,
      quickPriority: 1,
      breathing:
        "Inhale tall. Exhale as you rotate.",
      instructions:
        "Move continuously through the lunge and rotation rather than holding the stretch.",
      image: "/exercises/worlds-greatest-stretch.png",
    },
    {
      id: "golf-open-books-standing",
      name: "Standing golf rotations",
      type: "reps",
      target: 8,
      unit: "per side",
      sideSpecific: true,
      tags: ["thoracic", "hips", "golf"],
      core: true,
      quickPriority: 1,
      breathing:
        "Exhale into each rotation.",
      instructions:
        "Take your golf stance without a club and rotate the chest and hips smoothly in both directions.",
      image: "/exercises/golf-rotation.png",
    },
    {
      id: "golf-wall-slides",
      name: "Wall slides",
      type: "reps",
      target: 6,
      unit: "reps",
      sideSpecific: false,
      tags: ["shoulders", "golf"],
      core: false,
      quickPriority: 2,
      breathing:
        "Inhale up. Exhale down.",
      instructions:
        "Use a comfortable range. The goal is shoulder readiness, not a deep stretch.",
      image: "/exercises/wall-slides.png",
    },
    {
      id: "golf-practice-swings",
      name: "Slow practice swings",
      type: "reps",
      target: 8,
      unit: "swings",
      sideSpecific: false,
      tags: ["golf", "coordination"],
      core: true,
      quickPriority: 1,
      breathing:
        "Breathe naturally and stay relaxed.",
      instructions:
        "Make slow, controlled practice swings and gradually increase speed over the final few reps.",
      image: "/exercises/practice-swing.png",
    },
  ],

  "Pre-Snow": [
    {
      id: "snow-knee-wall",
      name: "Knee-to-wall ankle rocks",
      type: "reps",
      target: 10,
      unit: "per side",
      sideSpecific: true,
      tags: ["ankles", "snowboarding"],
      core: true,
      quickPriority: 1,
      breathing:
        "Exhale as the knee travels forward. Inhale back.",
      instructions:
        "Keep the heel planted and use smooth dynamic reps rather than a long hold.",
      image: "/exercises/knee-to-wall.png",
    },
    {
      id: "snow-squats",
      name: "Bodyweight squats",
      type: "reps",
      target: 12,
      unit: "reps",
      sideSpecific: false,
      tags: ["hips", "ankles", "legs", "snowboarding"],
      core: true,
      quickPriority: 1,
      breathing:
        "Inhale down. Exhale up.",
      instructions:
        "Use a snowboard-like athletic stance and move through a comfortable range.",
      image: "/exercises/bodyweight-squat.png",
    },
    {
      id: "snow-lateral-shift",
      name: "Lateral weight shifts",
      type: "reps",
      target: 10,
      unit: "per side",
      sideSpecific: true,
      tags: ["hips", "legs", "balance", "snowboarding"],
      core: true,
      quickPriority: 1,
      breathing:
        "Breathe naturally and stay relaxed.",
      instructions:
        "Stand wide with knees bent and shift your weight smoothly from side to side.",
      image: "/exercises/lateral-weight-shift.png",
    },
    {
      id: "snow-wipers",
      name: "Dynamic hip rotations",
      type: "reps",
      target: 8,
      unit: "per side",
      sideSpecific: true,
      tags: ["hips", "snowboarding"],
      core: true,
      quickPriority: 1,
      breathing:
        "Exhale into the rotation.",
      instructions:
        "Move through a comfortable hip rotation range without holding.",
      image: "/exercises/hip-rotation.png",
    },
    {
      id: "snow-calf-raises",
      name: "Calf raises",
      type: "reps",
      target: 12,
      unit: "reps",
      sideSpecific: false,
      tags: ["ankles", "calves", "snowboarding"],
      core: true,
      quickPriority: 2,
      breathing:
        "Exhale as you rise. Inhale as you lower.",
      instructions:
        "Rise onto the balls of the feet under control, then lower slowly.",
      image: "/exercises/calf-raise.png",
    },
    {
      id: "snow-torso-rotation",
      name: "Standing torso rotations",
      type: "reps",
      target: 8,
      unit: "per side",
      sideSpecific: true,
      tags: ["spine", "hips", "snowboarding"],
      core: false,
      quickPriority: 2,
      breathing:
        "Exhale into each rotation.",
      instructions:
        "Use soft knees and rotate the torso smoothly in both directions.",
      image: "/exercises/standing-torso-rotation.png",
    },
    {
      id: "snow-balance",
      name: "Single-leg balance",
      type: "timer",
      target: 20,
      unit: "sec per side",
      sideSpecific: true,
      tags: ["balance", "ankles", "hips", "snowboarding"],
      core: true,
      quickPriority: 2,
      breathing:
        "Breathe slowly and steadily.",
      instructions:
        "Stand on one leg with a soft knee. Keep the foot active and the pelvis level.",
      image: "/exercises/single-leg-balance.png",
    },
  ],
};

export const routineNames = [
  "Morning",
  "Night",
  "Office",
  "Pre-Golf",
  "Pre-Snow",
];
