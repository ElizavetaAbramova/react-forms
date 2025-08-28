import { useCallback, useState, type BaseSyntheticEvent } from 'react';
import type { ExtraData } from '../types&interfaces/CO2Response';

const availableColumns: ExtraData[] = [
  'methane',
  'oil_co2',
  'temperature_change_from_co2',
  'cement_co2',
  'cement_co2_per_capita',
];

interface Props {
  addColumns: (col: ExtraData[]) => void;
  closeModal: (state: boolean) => void;
  selectedColumns: ExtraData[];
}

function Modal({ addColumns, closeModal, selectedColumns }: Props) {
  const [tempColumns, setTempColumns] = useState<ExtraData[]>(selectedColumns);

  const toggleColumn = useCallback((col: ExtraData) => {
    setTempColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  }, []);

  const handleApplyExtraCol = useCallback(() => {
    addColumns(tempColumns);
    closeModal(false);
  }, [tempColumns, addColumns, closeModal]);

  const handleCloseModal = useCallback(
    (event: BaseSyntheticEvent) => {
      const element = event.target;
      if (
        element.classList.contains('modal-background') ||
        element.innerText === 'Cancel'
      ) {
        closeModal(false);
      }
    },
    [closeModal]
  );

  return (
    <div
      className="modal-background fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleCloseModal}
    >
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Select columns</h2>
        <div className="space-y-2">
          {availableColumns.map((col) => (
            <label key={col} className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={tempColumns.includes(col)}
                onChange={() => toggleColumn(col)}
              />
              {col}
            </label>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
          <button
            className="px-4 py-2 bg-blue-600 rounded"
            onClick={handleApplyExtraCol}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
