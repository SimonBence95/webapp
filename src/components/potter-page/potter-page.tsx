import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Potter } from '../../models';
import { PotterDescription } from './potter-description';
import { usePotterApi } from '../../state/use-potter-api';

export const PotterPage: FC = () => {
  const { potterId } = useParams<"potterId">();
  const [potter, setPotter] = useState<Potter | null>(null);
  const { getPotter } = usePotterApi();

  useEffect(() => {
    (async () => {
      try {
        if (!potterId) {
          return;
        }
        const potter = await getPotter(potterId);
        setPotter(potter);
      } catch (err) {
        //what to do now?
      }
    })();
  }, [potterId, setPotter]);

  if (!potter) {
    return null;
  }

  return (
    <PotterDescription potter={potter} />
  );
};
