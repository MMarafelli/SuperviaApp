import { useReducer, useCallback } from 'react';
import { ICampos } from '../types/calcConsumo.types';
import { StorageService } from '../services/StorageService';

type ActionType = 
  | { type: 'UPDATE_FIELD'; field: keyof ICampos; value: string }
  | { type: 'RESET_FORM' }
  | { type: 'LOAD_FROM_STORAGE'; data: ICampos }
  | { type: 'BATCH_UPDATE'; updates: Partial<ICampos> };

const appReducer = (state: ICampos, action: ActionType): ICampos => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'BATCH_UPDATE':
      return {
        ...state,
        ...action.updates,
      };
    case 'LOAD_FROM_STORAGE':
      return action.data;
    case 'RESET_FORM':
      return StorageService.getInitialState(false);
    default:
      return state;
  }
};

export const useAppState = (isDev: boolean = false) => {
  const initialState = StorageService.getInitialState(isDev);
  const [state, dispatch] = useReducer(appReducer, initialState);

  const updateField = useCallback((field: keyof ICampos, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
    // Salvar no localStorage automaticamente
    if (!isDev) {
      StorageService.setItem(field, value);
    }
  }, [isDev]);

  const batchUpdate = useCallback((updates: Partial<ICampos>) => {
    dispatch({ type: 'BATCH_UPDATE', updates });
    // Salvar múltiplos campos no localStorage
    if (!isDev) {
      Object.entries(updates).forEach(([key, value]) => {
        StorageService.setItem(key, value as string);
      });
    }
  }, [isDev]);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  const loadFromStorage = useCallback((data: ICampos) => {
    dispatch({ type: 'LOAD_FROM_STORAGE', data });
  }, []);

  return {
    state,
    updateField,
    batchUpdate,
    resetForm,
    loadFromStorage,
  };
};
