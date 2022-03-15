import React from 'react';
import MHidden from '../../components/@mui-extend/MHidden';
import DesktopAndIPadIntroSection from './DesktopAndIPadIntroSection';
import IPhoneIntroSection from './IPhoneIntroSection';

export default function AboutUs() {
  return (
    <>
      <MHidden width="mdDown">
        <DesktopAndIPadIntroSection />
      </MHidden>

      <MHidden width="mdUp">
        <MHidden width="smDown">
          <DesktopAndIPadIntroSection />
        </MHidden>
        <MHidden width="smUp">
          <IPhoneIntroSection />
        </MHidden>
      </MHidden>
    </>
  );
}