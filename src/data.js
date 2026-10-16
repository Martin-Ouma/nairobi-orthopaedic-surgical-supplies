/* ---------- catalogue ---------- */
const SZ=['S','M','L','XL'], SZ3=['S','M','L'], FOOT=['36–38','39–41','42–44','45–47'], SIDE=['Left','Right'];
const B='Braces & Supports', M='Mobility Aids', I='Insoles & Footwear', TH='Therapy & Rehab', PO='Posture & Seating', SU='Surgical & Post-op';
const PRODUCTS = [
 {id:1,name:'Hinged Knee Brace',region:'Knee',cat:B,price:7800,level:3,sizes:SZ,spec:'Dual side hinges, neoprene body',desc:'Metal side hinges limit sideways movement after a ligament strain or during return to sport.'},
 {id:2,name:'Patella Stabilizer Sleeve',region:'Knee',cat:B,price:2400,level:2,sizes:SZ,spec:'Open-patella ring, breathable knit',desc:'A padded ring keeps the kneecap tracking while you walk, climb stairs or train.'},
 {id:3,name:'Knee Compression Sleeve',region:'Knee',cat:B,price:1800,level:1,sizes:SZ,spec:'Graduated compression, sold singly',desc:'Light warmth and compression for stiff or mildly arthritic knees through the day.'},
 {id:4,name:'Lumbar Support Belt',region:'Back',cat:B,price:3200,level:2,sizes:SZ,spec:'Elastic with dual pull straps',desc:'Adjustable lower back belt for lifting, long standing and recovery from muscle strain.'},
 {id:5,name:'Rigid Panel Lumbar Brace',region:'Back',cat:B,price:9500,level:4,sizes:SZ3,spec:'Rear and side rigid panels',desc:'Firm panels limit bending and twisting. Often prescribed after spinal procedures.'},
 {id:6,name:'Orthopaedic Lumbar Cushion',region:'Back',cat:PO,price:2900,level:1,sizes:null,spec:'High-density memory foam, 38 cm wide',desc:'Fills the curve of the lower back in office chairs, car seats and wheelchairs.'},
 {id:7,name:'Coccyx Seat Wedge',region:'Back',cat:PO,price:3400,level:1,sizes:null,spec:'Tilted wedge with cut-out, 8 cm rise',desc:'Takes pressure off the tailbone and tilts the pelvis forward for a more upright seat.'},
 {id:8,name:'Soft Cervical Collar',region:'Shoulder & Neck',cat:B,price:1900,level:2,sizes:SZ3,spec:'Foam core, cotton cover',desc:'Gentle neck support for whiplash and muscle spasm. Not for fracture immobilization.'},
 {id:9,name:'Cervical Contour Pillow',region:'Shoulder & Neck',cat:PO,price:4200,level:1,sizes:null,spec:'Two-height memory foam',desc:'Keeps the neck neutral on your back or side to ease morning stiffness.'},
 {id:10,name:'Shoulder Immobilizer Sling',region:'Shoulder & Neck',cat:B,price:3600,level:3,sizes:SZ3,spec:'Abduction pillow, waist strap',desc:'Holds the arm against the body after a dislocation, repair or collarbone injury.'},
 {id:11,name:'Clavicle Figure-8 Brace',region:'Shoulder & Neck',cat:B,price:2800,level:3,sizes:SZ3,spec:'Padded straps, quick-release buckle',desc:'Pulls the shoulders back to support a healing collarbone and improve posture.'},
 {id:12,name:'Rotator Cuff Compression Wrap',region:'Shoulder & Neck',cat:B,price:3100,level:2,sizes:SZ,spec:'Neoprene, hot and cold gel pocket',desc:'Warm, snug support for tendon irritation and general shoulder weakness.'},
 {id:13,name:'Tennis Elbow Strap',region:'Elbow & Wrist',cat:B,price:1400,level:1,sizes:null,spec:'Adjustable, one size 22–35 cm',desc:'Spreads the load away from the tendon at the outside of the elbow.'},
 {id:14,name:'Carpal Tunnel Wrist Splint',region:'Elbow & Wrist',cat:B,price:1900,level:3,sizes:SIDE,spec:'Removable palm stay, wear at night',desc:'Keeps the wrist straight while you sleep to reduce numbness and tingling.'},
 {id:15,name:'Finger Splint Set',region:'Elbow & Wrist',cat:B,price:1200,level:2,sizes:null,spec:'Set of 6, aluminium core',desc:'Padded splints for sprains, trigger finger and mallet injuries.'},
 {id:16,name:'Ankle Stirrup Brace',region:'Ankle & Foot',cat:B,price:3900,level:3,sizes:SZ3,spec:'Rigid side shells, fits in a shoe',desc:'Blocks rolling inward and outward while leaving forward and back motion free.'},
 {id:17,name:'CAM Walking Boot',region:'Ankle & Foot',cat:B,price:14500,level:4,sizes:SZ3,spec:'Rocker sole, air cells, 32 cm shaft',desc:'Near-full immobilization for stress fractures, sprains and post-surgery protection.'},
 {id:18,name:'Arch Support Insoles',region:'Ankle & Foot',cat:I,price:2200,level:2,sizes:FOOT,spec:'3/4 length, firm shell, EU sizes',desc:'Supports the arch and cushions the heel for flat feet and plantar fasciitis.'},
 {id:19,name:'Plantar Fasciitis Night Splint',region:'Ankle & Foot',cat:TH,price:4800,level:3,sizes:SZ3,spec:'Dorsiflexion boot, 90° hold',desc:'Holds the foot flexed overnight so the first steps of the morning hurt less.'},
 {id:20,name:'Diabetic Comfort Shoes',region:'Ankle & Foot',cat:I,price:8900,level:2,sizes:FOOT,spec:'Extra depth, seam-free lining',desc:'Wide, seam-free shoes that leave room for orthotics and sensitive feet.'},
 {id:21,name:'Forearm Crutches (pair)',region:'Mobility',cat:M,price:5400,level:null,sizes:null,spec:'Aluminium, user up to 136 kg',desc:'Height-adjustable with cushioned grips and cuffs for short-term or daily use.'},
 {id:22,name:'Folding Walking Frame',region:'Mobility',cat:M,price:6800,level:null,sizes:null,spec:'Height 79–94 cm, folds flat',desc:'A stable frame for balance after hip or knee surgery.'},
 {id:23,name:'Quad Cane',region:'Mobility',cat:M,price:2300,level:null,sizes:null,spec:'Four-point base, user up to 120 kg',desc:'Stands on its own and gives more stability than a single-tip cane.'},
 {id:24,name:'Knee Scooter',region:'Mobility',cat:M,price:16800,level:null,sizes:null,spec:'Hand brake, 12.5 cm wheels',desc:'Rest a broken foot or ankle on the pad and roll instead of hopping.'},
 {id:25,name:'Folding Transport Wheelchair',region:'Mobility',cat:M,price:38500,level:null,sizes:null,spec:'Steel frame, 46 cm seat, 13 kg',desc:'Light, folds into a car boot, with rear hand brakes for a companion.'},
 {id:26,name:'Shower Chair with Backrest',region:'Mobility',cat:M,price:7200,level:null,sizes:null,spec:'Anti-slip feet, user up to 130 kg',desc:'Lets you wash seated and safely after surgery or when balance is poor.'},
 {id:27,name:'Hot & Cold Gel Pack Set',region:'Recovery',cat:TH,price:1500,level:null,sizes:null,spec:'Set of 3, 10 × 27 cm',desc:'Reusable packs for swelling in the first days and stiffness after.'},
 {id:28,name:'TENS Pain Relief Unit',region:'Recovery',cat:TH,price:9800,level:null,sizes:null,spec:'Dual channel, 8 programs, rechargeable',desc:'Gentle electrical pulses for back, knee and shoulder pain between sessions.'},
 {id:29,name:'Resistance Band Rehab Kit',region:'Recovery',cat:TH,price:1900,level:null,sizes:null,spec:'3 strengths, door anchor, guide',desc:'Light, medium and firm bands for the strengthening phase of rehab.'},
 {id:30,name:'Sterile Wound Dressing Pack',region:'Recovery',cat:SU,price:1600,level:null,sizes:null,spec:'Pack of 10, 10 × 10 cm pads',desc:'Sterile pads, tape and gauze for changing the dressing over a surgical site at home.'},
 {id:31,name:'Anti-Embolism Compression Stockings',region:'Recovery',cat:SU,price:3400,level:null,sizes:SZ3,spec:'Knee-length, graduated compression',desc:'Support blood flow in the legs while you are less active after surgery.'},
 {id:32,name:'Post-Op Abdominal Binder',region:'Recovery',cat:SU,price:4100,level:null,sizes:SZ,spec:'24 cm wide, hook-and-loop closure',desc:'Gentle abdominal support and a firmer feel after surgery.'},
 {id:33,name:'Waterproof Cast Protector',region:'Recovery',cat:SU,price:1300,level:null,sizes:['Arm','Leg'],spec:'Reusable, watertight seal',desc:'Keeps a cast or dressing dry in the shower.'},
 {id:34,name:'Elastic Bandage Set',region:'Recovery',cat:SU,price:900,level:null,sizes:null,spec:'Set of 4, 7.5 cm × 4.5 m',desc:'Crepe bandages for light compression and holding dressings in place.'}
];
const REGIONS=['Knee','Back','Shoulder & Neck','Elbow & Wrist','Ankle & Foot','Mobility','Recovery'];
const CATS=[B,M,I,TH,PO,SU];
const CATKEY={}; CATKEY[B]='braces'; CATKEY[M]='mobility'; CATKEY[I]='insoles'; CATKEY[TH]='therapy'; CATKEY[PO]='posture'; CATKEY[SU]='surgical';
const LEVELS=[null,
  ['Light','Compression and warmth'],['Moderate','Gentle stabilization'],['Firm','Limits range of motion'],['Rigid','Near-immobilization']];
const FREE_OVER=10000, FEE=500;
const money = n => 'KES ' + Number(n).toLocaleString('en-KE');
const byId = id => PRODUCTS.find(p=>p.id===id);
const CONTACT = { display: '0769 209 171', tel: '+254769209171', wa: '254769209171' };
const BIZ = 'Nairobi Orthopaedic & Surgical Supplies';
const waLink = (text) => 'https://wa.me/' + CONTACT.wa + '?text=' + encodeURIComponent(text);
export { CONTACT, BIZ, waLink, PRODUCTS, REGIONS, CATS, CATKEY, LEVELS, FREE_OVER, FEE, FOOT, SIDE, money, byId };
