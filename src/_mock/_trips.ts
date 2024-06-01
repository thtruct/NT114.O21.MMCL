export const ProductIdArr = [
  {
    id: 0,
    logo: '/logo/onboarding/logo_valys.svg',
  },
  {
    id: 1,
    logo: '/logo/onboarding/logo_transvision.svg',
  },
  {
    id: 2,
    logo: '/logo/onboarding/logo_dextr.svg',
  },
];
const generateTrip = (id: number) => ({
  id,
  productId: Math.floor(Math.random() * ProductIdArr.length),
  detail: '123454678', // todo: ask Roelf where
  travelTime: 5400,
  distance: 178,
  destinationAddress: {
    street: 'Souburghlaan',
    number: 18,
    numberExtraInformation: 0,
    city: 'Waddinxveen',
    zip: '2741EL',
  },
  destinationDateTime: '2023-12-08 03:57:00.000000 +00:00',
  vehicleType: 'Rolstoeltaxi',
  client: { firstName: '', lastName: 'Dextr Algemeen', phone: '', mobile: '' },
  extraInfo: {
    equipments: [
      { id: 3, name: 'Rollator', amount: 1 },
      { id: 8, name: 'Driewielfiets', amount: 1 },
    ],
  },
  passengers: 2,
  luggage: 2,
  fromAddress: {
    street: 'Rotterdam Airportplein',
    number: 60,
    numberExtraInformation: 0,
    city: 'Rotterdam',
    zip: '3045AP',
  },
  fromDateTime: '2023-09-13 14:30:00.000000 +00:00',
  comment: '',
});
export const _Trips = [...Array(20)].map((_, idx) => generateTrip(idx));
