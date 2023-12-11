import { gql } from 'apollo-angular';

export const CreateInitPhase = gql`
  mutation CreateInitPhase($initPhase: InitPhaseInput!) {
    createInitPhase(init_phase: $initPhase) {
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

export const UpdateInitPhase = gql`
  mutation UpdateInitPhase($id: ID!, $initPhase: InitPhaseInput!) {
    updateInitPhase(id: $id, init_phase: $initPhase) {
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

export const DeleteInitPhase = gql`
  mutation DeleteInitPhase($id: ID!) {
    deleteInitPhase(id: $id) {
      id
    }
  }
`;

export const CreateAnalysisPhase = gql`
  mutation CreateAnalysisPhase($analysisPhase: AnalysisPhaseInput!) {
    createAnalysisPhase(analysis_phase: $analysisPhase) {
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

export const UpdateAnalysisPhase = gql`
  mutation UpdateAnalysisPhase(
    $id: ID!
    $analysisPhase: UpdateAnalysisPhaseInput!
  ) {
    updateAnalysisPhase(id: $id, analysis_phase: $analysisPhase) {
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

export const DeleteAnalysisPhase = gql`
  mutation DeleteAnalysisPhase($id: ID!) {
    deleteAnalysisPhase(id: $id) {
      id
    }
  }
`;

export const CreateDesignPhase = gql`
  mutation CreateDesignPhase($designPhase: DesignPhaseInput!) {
    createDesignPhase(design_phase: $designPhase) {
      id
      filename
      image
      type
    }
  }
`;

export const DeleteDesignPhase = gql`
  mutation Mutation($id: ID!) {
    deleteDesignPhase(id: $id) {
      id
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
