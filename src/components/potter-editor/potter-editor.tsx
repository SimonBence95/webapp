import { FC } from 'react';
import { usePotterContext } from '../../state';
import { usePotterApi } from '../../state/use-potter-api';
import { PotterEditorModal } from './potter-editor-modal';

export const PotterEditor: FC = () => {
  const { editor, closeEditor } = usePotterContext();
  const { addPotter, editPotter } = usePotterApi();

  return (
    <PotterEditorModal
      isOpen={editor.showModal}
      onClose={closeEditor}
      potter={editor.potter}
      onSubmit={editor.potter ? editPotter : addPotter}
    />
  );
};
