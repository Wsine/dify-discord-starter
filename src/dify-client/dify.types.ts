/**
 * This file contains types from the original dify repository, which are required for the SSE functionality in the dify cliennt.
 * All types have been copied from https://github.com/langgenius/dify/.
 *
 * If you need to do adjusments here, you probably want to copy updated types from the original repository instead.
 */

export type MessageMore = {
  time: string;
  tokens: number;
  latency: number | string;
};

export type SubmitAnnotationFunc = (
  messageId: string,
  content: string,
) => Promise<any>;

export type DisplayScene = "web" | "console";

export type ToolInfoInThought = {
  name: string;
  input: string;
  output: string;
  isFinished: boolean;
};

export type VisionFile = {
  id?: string;
  type: string;
  transfer_method: unknown;
  url: string;
  upload_file_id: string;
  belongs_to?: string;
};

export type ThoughtItem = {
  id: string;
  tool: string; // plugin or dataset. May has multi.
  thought: string;
  tool_input: string;
  message_id: string;
  observation: string;
  position: number;
  files?: string[];
  message_files?: string[];
};

export type CitationItem = {
  content: string;
  data_source_type: string;
  dataset_name: string;
  dataset_id: string;
  document_id: string;
  document_name: string;
  hit_count: number;
  index_node_hash: string;
  segment_id: string;
  segment_position: number;
  score: number;
  word_count: number;
};

export const MessageRatings = ["like", "dislike", null] as const;
export type MessageRating = (typeof MessageRatings)[number];

export type Feedbacktype = {
  rating: MessageRating;
  content?: string | null;
};

export type IChatItem = {
  id: string;
  content: string;
  citation?: CitationItem[];
  /**
   * Specific message type
   */
  isAnswer: boolean;
  /**
   * The user feedback result of this message
   */
  feedback?: Feedbacktype;
  /**
   * The admin feedback result of this message
   */
  adminFeedback?: Feedbacktype;
  /**
   * Whether to hide the feedback area
   */
  feedbackDisabled?: boolean;
  /**
   * More information about this message
   */
  more?: MessageMore;
  annotation?: Annotation;
  useCurrentUserAvatar?: boolean;
  isOpeningStatement?: boolean;
  suggestedQuestions?: string[];
  log?: { role: string; text: string }[];
  agent_thoughts?: ThoughtItem[];
  message_files?: VisionFile[];
};

export type Annotation = {
  id: string;
  authorName: string;
  logAnnotation?: unknown;
  created_at?: number;
};

export type MessageEnd = {
  id: string;
  metadata: {
    retriever_resources?: CitationItem[];
    annotation_reply: {
      id: string;
      account: {
        id: string;
        name: string;
      };
    };
  };
};

export type MessageReplace = {
  id: string;
  task_id: string;
  answer: string;
  conversation_id: string;
};

export type AnnotationReply = {
  id: string;
  task_id: string;
  answer: string;
  conversation_id: string;
  annotation_id: string;
  annotation_author_name: string;
};

export type IOnDataMoreInfo = {
  conversationId?: string;
  taskId?: string;
  messageId: string;
  errorMessage?: string;
  errorCode?: string;
};

export type IOnData = (
  message: string,
  isFirstMessage: boolean,
  moreInfo: IOnDataMoreInfo,
) => void;
export type IOnThought = (though: ThoughtItem) => void;
export type IOnFile = (file: VisionFile) => void;
export type IOnMessageEnd = (messageEnd: MessageEnd) => void;
export type IOnMessageReplace = (messageReplace: MessageReplace) => void;
export type IOnAnnotationReply = (messageReplace: AnnotationReply) => void;
export type IOnCompleted = (hasError?: boolean) => void;
export type IOnError = (msg: string, code?: string) => void;

export type IOtherOptions = {
  isPublicAPI?: boolean;
  bodyStringify?: boolean;
  needAllResponseContent?: boolean;
  deleteContentType?: boolean;
  onData?: IOnData; // for stream
  onThought?: IOnThought;
  onFile?: IOnFile;
  onMessageEnd?: IOnMessageEnd;
  onMessageReplace?: IOnMessageReplace;
  onError?: IOnError;
  onCompleted?: IOnCompleted; // for stream
  getAbortController?: (abortController: AbortController) => void;
};
