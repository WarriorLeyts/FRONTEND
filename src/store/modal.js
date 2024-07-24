import { create } from 'zustand';

const modalActive = (set) => (
  {
    regModalActive: false,
    setRegModalActive: () => set(({ regModalActive }) => ({ regModalActive: !regModalActive })),

    authorModalActive: false,
    setAuthorModalActive: () => {
      set(({ authorModalActive }) => ({ authorModalActive: !authorModalActive }));
    },
  });
const usemodalActive = create(modalActive);
export default usemodalActive;
