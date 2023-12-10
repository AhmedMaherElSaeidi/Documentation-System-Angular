import { gql } from 'apollo-angular';

export const GetAllInitPhases = gql`
  query GetAllInitPhases {
    getAllInitPhases {
      id
      title
      startDate
      finishDate
      objectives
      manager
      budgetInfo
      scopeStatements
      type
    }
  }
`;

export const GetInitPhase = gql`
  query GetInitPhase($id: ID!) {
    getInitPhase(id: $id) {
      id
      title
      startDate
      finishDate
      objectives
      manager
      budgetInfo
      scopeStatements
      type
    }
  }
`;

export const GetAllAnalysisPhases = gql`
  query GetAllAnalysisPhases {
    getAllAnalysisPhases {
      id
      introduction
      purpose
      audience
      sw_description
      sys_fr
      image
      type
    }
  }
`;

export const GetAnalysisPhase = gql`
  query GetAnalysisPhase($id: ID!) {
    getAnalysisPhase(id: $id) {
      id
      introduction
      purpose
      audience
      sw_description
      sys_fr
      image
      type
    }
  }
`;

export const GetAllDesignPhases = gql`
  query GetAllDesignPhases {
    getAllDesignPhases {
      id
      filename
      image
      type
    }
  }
`;

export const GetDesignPhase = gql`
  query GetDesignPhase($id: ID!) {
    getDesignPhase(id: $id) {
      id
      filename
      image
      type
    }
  }
`;
