import { PreferredLanguage } from './types';

// UI Messages for internationalization
export interface UIMessages {
  // Progress Modal
  progressTitle: string;
  estimatedTime: string;
  cancel: string;

  // Progress Steps
  stepAnalyzing: string;
  stepGeneratingPrompt: string;
  stepGeneratingImage: string;
  stepSaving: string;
  stepEmbedding: string;

  // Success
  successTitle: string;
  successSaved: string;
  confirm: string;

  // Error
  errorTitle: string;
  errorSolutions: string;
  retry: string;
  close: string;

  // Error Suggestions
  suggestionCheckApiKey: string;
  suggestionVerifyApiKey: string;
  suggestionActivateApiKey: string;
  suggestionWaitAndRetry: string;
  suggestionCheckQuota: string;
  suggestionCheckInternet: string;
  suggestionCheckVPN: string;
  suggestionTryDifferentStyle: string;
  suggestionModifyContent: string;
  suggestionContentMayBeSensitive: string;
  suggestionAddContent: string;

  // Preview Modal
  previewTitle: string;
  previewPromptLabel: string;
  previewCharacters: string;
  previewTipsTitle: string;
  previewTip1: string;
  previewTip2: string;
  previewTip3: string;
  previewGenerate: string;
  previewRegenerate: string;
  previewPromptModel: string;
  previewImageModel: string;
  previewStyle: string;
}

export const MESSAGES: Record<PreferredLanguage, UIMessages> = {
  ko: {
    // Progress Modal
    progressTitle: '🎨 knowledge poster 생성 중...',
    estimatedTime: '⏱️ 예상 소요 시간: 약 15-30초',
    cancel: '취소',

    // Progress Steps
    stepAnalyzing: '노트 분석',
    stepGeneratingPrompt: '프롬프트 생성',
    stepGeneratingImage: '이미지 생성',
    stepSaving: '파일 저장',
    stepEmbedding: '노트에 삽입',

    // Success
    successTitle: '✅ knowledge poster 생성 완료!',
    successSaved: '📁 저장 위치',
    confirm: '확인',

    // Error
    errorTitle: '❌ 생성 실패',
    errorSolutions: '💡 해결 방법:',
    retry: '다시 시도',
    close: '닫기',

    // Error Suggestions
    suggestionCheckApiKey: '설정에서 API 키를 확인해주세요',
    suggestionVerifyApiKey: 'API 키가 올바르게 입력되었는지 확인해주세요',
    suggestionActivateApiKey: '해당 서비스의 API 키가 활성화되어 있는지 확인해주세요',
    suggestionWaitAndRetry: '잠시 후 다시 시도해주세요',
    suggestionCheckQuota: 'API 사용량 한도를 확인해주세요',
    suggestionCheckInternet: '인터넷 연결을 확인해주세요',
    suggestionCheckVPN: 'VPN이나 프록시 설정을 확인해주세요',
    suggestionTryDifferentStyle: '다른 스타일로 시도해보세요',
    suggestionModifyContent: '노트 내용을 수정하고 다시 시도해주세요',
    suggestionContentMayBeSensitive: '민감한 내용이 포함되어 있을 수 있습니다',
    suggestionAddContent: '노트에 내용을 추가해주세요',

    // Preview Modal
    previewTitle: '📝 프롬프트 미리보기',
    previewPromptLabel: '생성된 프롬프트 (수정 가능):',
    previewCharacters: '자',
    previewTipsTitle: '💡 팁:',
    previewTip1: '프롬프트를 수정하여 원하는 스타일로 조정할 수 있습니다',
    previewTip2: '구체적인 색상, 레이아웃, 요소를 추가하면 더 좋은 결과를 얻을 수 있습니다',
    previewTip3: '"다시 생성" 버튼으로 새로운 프롬프트를 생성할 수 있습니다',
    previewGenerate: '🎨 이미지 생성',
    previewRegenerate: '🔄 다시 생성',
    previewPromptModel: '🤖 프롬프트 모델',
    previewImageModel: '🖼️ 이미지 모델',
    previewStyle: '📊 스타일'
  },

  en: {
    // Progress Modal
    progressTitle: '🎨 Generating knowledge poster...',
    estimatedTime: '⏱️ estimated time: about 15-30 seconds',
    cancel: 'Cancel',

    // Progress Steps
    stepAnalyzing: 'Analyzing note',
    stepGeneratingPrompt: 'Generating prompt',
    stepGeneratingImage: 'Generating image',
    stepSaving: 'Saving file',
    stepEmbedding: 'Embedding in note',

    // Success
    successTitle: '✅ Knowledge poster created!',
    successSaved: '📁 saved to',
    confirm: 'OK',

    // Error
    errorTitle: '❌ Generation failed',
    errorSolutions: '💡 Solutions:',
    retry: 'Retry',
    close: 'Close',

    // Error Suggestions
    suggestionCheckApiKey: 'Please check your API key in settings',
    suggestionVerifyApiKey: 'Please verify that your API key is entered correctly',
    suggestionActivateApiKey: 'Please ensure the API key is activated for this service',
    suggestionWaitAndRetry: 'Please wait a moment and try again',
    suggestionCheckQuota: 'Please check your API usage quota',
    suggestionCheckInternet: 'Please check your internet connection',
    suggestionCheckVPN: 'Please check your VPN or proxy settings',
    suggestionTryDifferentStyle: 'Please try a different style',
    suggestionModifyContent: 'Please modify the note content and try again',
    suggestionContentMayBeSensitive: 'The content may contain sensitive material',
    suggestionAddContent: 'Please add content to your note',

    // Preview Modal
    previewTitle: '📝 Prompt preview',
    previewPromptLabel: 'Generated prompt (editable):',
    previewCharacters: 'characters',
    previewTipsTitle: '💡 Tips:',
    previewTip1: 'You can edit the prompt to adjust the desired style',
    previewTip2: 'Adding specific colors, layouts, and elements will give better results',
    previewTip3: 'Use the "Regenerate" button to create a new prompt',
    previewGenerate: '🎨 Generate image',
    previewRegenerate: '🔄 Regenerate',
    previewPromptModel: '🤖 Prompt model',
    previewImageModel: '🖼️ Image model',
    previewStyle: '📊 Style'
  },

  ja: {
    // Progress Modal
    progressTitle: '🎨 ナレッジポスター生成中...',
    estimatedTime: '⏱️ 推定時間：約15〜30秒',
    cancel: 'キャンセル',

    // Progress Steps
    stepAnalyzing: 'ノート分析',
    stepGeneratingPrompt: 'プロンプト生成',
    stepGeneratingImage: '画像生成',
    stepSaving: 'ファイル保存',
    stepEmbedding: 'ノートに挿入',

    // Success
    successTitle: '✅ ナレッジポスター作成完了！',
    successSaved: '📁 保存先',
    confirm: 'OK',

    // Error
    errorTitle: '❌ 生成失敗',
    errorSolutions: '💡 解決方法：',
    retry: '再試行',
    close: '閉じる',

    // Error Suggestions
    suggestionCheckApiKey: '設定でAPIキーを確認してください',
    suggestionVerifyApiKey: 'APIキーが正しく入力されているか確認してください',
    suggestionActivateApiKey: 'このサービスのAPIキーが有効化されているか確認してください',
    suggestionWaitAndRetry: 'しばらく待ってから再度お試しください',
    suggestionCheckQuota: 'API使用量の上限を確認してください',
    suggestionCheckInternet: 'インターネット接続を確認してください',
    suggestionCheckVPN: 'VPNまたはプロキシ設定を確認してください',
    suggestionTryDifferentStyle: '別のスタイルで試してください',
    suggestionModifyContent: 'ノートの内容を修正して再度お試しください',
    suggestionContentMayBeSensitive: '機密性の高い内容が含まれている可能性があります',
    suggestionAddContent: 'ノートに内容を追加してください',

    // Preview Modal
    previewTitle: '📝 プロンプトプレビュー',
    previewPromptLabel: '生成されたプロンプト (編集可能):',
    previewCharacters: '文字',
    previewTipsTitle: '💡 ヒント:',
    previewTip1: 'プロンプトを編集して希望のスタイルに調整できます',
    previewTip2: '具体的な色、レイアウト、要素を追加すると、より良い結果が得られます',
    previewTip3: '「再生成」ボタンで新しいプロンプトを生成できます',
    previewGenerate: '🎨 画像生成',
    previewRegenerate: '🔄 再生成',
    previewPromptModel: '🤖 プロンプトモデル',
    previewImageModel: '🖼️ 画像モデル',
    previewStyle: '📊 スタイル'
  },

  zh: {
    // Progress Modal
    progressTitle: '🎨 正在生成知识海报...',
    estimatedTime: '⏱️ 预计时间：约15-30秒',
    cancel: '取消',

    // Progress Steps
    stepAnalyzing: '分析笔记',
    stepGeneratingPrompt: '生成提示词',
    stepGeneratingImage: '生成图片',
    stepSaving: '保存文件',
    stepEmbedding: '插入笔记',

    // Success
    successTitle: '✅ 知识海报创建完成！',
    successSaved: '📁 保存位置',
    confirm: '确认',

    // Error
    errorTitle: '❌ 生成失败',
    errorSolutions: '💡 解决方法：',
    retry: '重试',
    close: '关闭',

    // Error Suggestions
    suggestionCheckApiKey: '请在设置中检查API密钥',
    suggestionVerifyApiKey: '请确认API密钥输入正确',
    suggestionActivateApiKey: '请确认该服务的API密钥已激活',
    suggestionWaitAndRetry: '请稍后重试',
    suggestionCheckQuota: '请检查API使用配额',
    suggestionCheckInternet: '请检查网络连接',
    suggestionCheckVPN: '请检查VPN或代理设置',
    suggestionTryDifferentStyle: '请尝试其他风格',
    suggestionModifyContent: '请修改笔记内容后重试',
    suggestionContentMayBeSensitive: '内容可能包含敏感信息',
    suggestionAddContent: '请在笔记中添加内容',

    // Preview Modal
    previewTitle: '📝 提示词预览',
    previewPromptLabel: '生成的提示词 (可编辑):',
    previewCharacters: '字符',
    previewTipsTitle: '💡 提示:',
    previewTip1: '您可以编辑提示词以调整所需样式',
    previewTip2: '添加具体的颜色、布局和元素将获得更好的效果',
    previewTip3: '使用"重新生成"按钮创建新的提示词',
    previewGenerate: '🎨 生成图片',
    previewRegenerate: '🔄 重新生成',
    previewPromptModel: '🤖 提示词模型',
    previewImageModel: '🖼️ 图片模型',
    previewStyle: '📊 风格'
  },

  es: {
    // Progress Modal
    progressTitle: '🎨 generando póster de conocimiento...',
    estimatedTime: '⏱️ Tiempo estimado: aproximadamente 15-30 segundos',
    cancel: 'Cancelar',

    // Progress Steps
    stepAnalyzing: 'Analizando nota',
    stepGeneratingPrompt: 'Generando prompt',
    stepGeneratingImage: 'Generando imagen',
    stepSaving: 'Guardando archivo',
    stepEmbedding: 'Insertando en nota',

    // Success
    successTitle: '✅ ¡póster de conocimiento creado!',
    successSaved: '📁 Guardado en',
    confirm: 'Aceptar',

    // Error
    errorTitle: '❌ generación fallida',
    errorSolutions: '💡 soluciones:',
    retry: 'Reintentar',
    close: 'Cerrar',

    // Error Suggestions
    suggestionCheckApiKey: 'Por favor, verifica tu clave API en la configuración',
    suggestionVerifyApiKey: 'Por favor, verifica que tu clave API esté ingresada correctamente',
    suggestionActivateApiKey: 'Por favor, asegúrate de que la clave API esté activada para este servicio',
    suggestionWaitAndRetry: 'Por favor, espera un momento e inténtalo de nuevo',
    suggestionCheckQuota: 'Por favor, verifica tu cuota de uso de API',
    suggestionCheckInternet: 'Por favor, verifica tu conexión a internet',
    suggestionCheckVPN: 'Por favor, verifica tu configuración de VPN o proxy',
    suggestionTryDifferentStyle: 'Por favor, intenta con un estilo diferente',
    suggestionModifyContent: 'Por favor, modifica el contenido de la nota e inténtalo de nuevo',
    suggestionContentMayBeSensitive: 'El contenido puede contener material sensible',
    suggestionAddContent: 'Por favor, agrega contenido a tu nota',

    // Preview Modal
    previewTitle: '📝 vista previa del prompt',
    previewPromptLabel: 'Prompt generado (editable):',
    previewCharacters: 'caracteres',
    previewTipsTitle: '💡 consejos:',
    previewTip1: 'Puedes editar el prompt para ajustar el estilo deseado',
    previewTip2: 'Agregar colores, diseños y elementos específicos dará mejores resultados',
    previewTip3: 'Usa el botón "Regenerar" para crear un nuevo prompt',
    previewGenerate: '🎨 generar imagen',
    previewRegenerate: '🔄 regenerar',
    previewPromptModel: '🤖 modelo de prompt',
    previewImageModel: '🖼️ modelo de imagen',
    previewStyle: '📊 estilo'
  },

  fr: {
    // Progress Modal
    progressTitle: '🎨 génération de l\'affiche de connaissances...',
    estimatedTime: '⏱️ Temps estimé : environ 15-30 secondes',
    cancel: 'Annuler',

    // Progress Steps
    stepAnalyzing: 'Analyse de la note',
    stepGeneratingPrompt: 'Génération du prompt',
    stepGeneratingImage: 'Génération de l\'image',
    stepSaving: 'Enregistrement du fichier',
    stepEmbedding: 'Insertion dans la note',

    // Success
    successTitle: '✅ affiche de connaissances créée !',
    successSaved: '📁 Enregistré dans',
    confirm: 'OK',

    // Error
    errorTitle: '❌ échec de la génération',
    errorSolutions: '💡 solutions :',
    retry: 'Réessayer',
    close: 'Fermer',

    // Error Suggestions
    suggestionCheckApiKey: 'Veuillez vérifier votre clé API dans les paramètres',
    suggestionVerifyApiKey: 'Veuillez vérifier que votre clé API est correctement saisie',
    suggestionActivateApiKey: 'Veuillez vous assurer que la clé API est activée pour ce service',
    suggestionWaitAndRetry: 'Veuillez attendre un moment et réessayer',
    suggestionCheckQuota: 'Veuillez vérifier votre quota d\'utilisation de l\'API',
    suggestionCheckInternet: 'Veuillez vérifier votre connexion Internet',
    suggestionCheckVPN: 'Veuillez vérifier vos paramètres VPN ou proxy',
    suggestionTryDifferentStyle: 'Veuillez essayer un style différent',
    suggestionModifyContent: 'Veuillez modifier le contenu de la note et réessayer',
    suggestionContentMayBeSensitive: 'Le contenu peut contenir du matériel sensible',
    suggestionAddContent: 'Veuillez ajouter du contenu à votre note',

    // Preview Modal
    previewTitle: '📝 aperçu du prompt',
    previewPromptLabel: 'Prompt généré (modifiable):',
    previewCharacters: 'caractères',
    previewTipsTitle: '💡 conseils:',
    previewTip1: 'Vous pouvez modifier le prompt pour ajuster le style souhaité',
    previewTip2: 'Ajouter des couleurs, des mises en page et des éléments spécifiques donnera de meilleurs résultats',
    previewTip3: 'Utilisez le bouton "Régénérer" pour créer un nouveau prompt',
    previewGenerate: '🎨 générer l\'image',
    previewRegenerate: '🔄 régénérer',
    previewPromptModel: '🤖 modèle de prompt',
    previewImageModel: '🖼️ modèle d\'image',
    previewStyle: '📊 style'
  },

  de: {
    // Progress Modal
    progressTitle: '🎨 wissensposter wird erstellt...',
    estimatedTime: '⏱️ Geschätzte Zeit: etwa 15-30 Sekunden',
    cancel: 'Abbrechen',

    // Progress Steps
    stepAnalyzing: 'Notiz analysieren',
    stepGeneratingPrompt: 'Prompt generieren',
    stepGeneratingImage: 'Bild generieren',
    stepSaving: 'Datei speichern',
    stepEmbedding: 'In Notiz einfügen',

    // Success
    successTitle: '✅ wissensposter erstellt!',
    successSaved: '📁 Gespeichert in',
    confirm: 'OK',

    // Error
    errorTitle: '❌ generierung fehlgeschlagen',
    errorSolutions: '💡 lösungen:',
    retry: 'Wiederholen',
    close: 'Schließen',

    // Error Suggestions
    suggestionCheckApiKey: 'Bitte überprüfen Sie Ihren API-Schlüssel in den Einstellungen',
    suggestionVerifyApiKey: 'Bitte überprüfen Sie, ob Ihr API-Schlüssel korrekt eingegeben wurde',
    suggestionActivateApiKey: 'Bitte stellen Sie sicher, dass der API-Schlüssel für diesen Dienst aktiviert ist',
    suggestionWaitAndRetry: 'Bitte warten Sie einen Moment und versuchen Sie es erneut',
    suggestionCheckQuota: 'Bitte überprüfen Sie Ihr API-Nutzungskontingent',
    suggestionCheckInternet: 'Bitte überprüfen Sie Ihre Internetverbindung',
    suggestionCheckVPN: 'Bitte überprüfen Sie Ihre VPN- oder Proxy-Einstellungen',
    suggestionTryDifferentStyle: 'Bitte versuchen Sie einen anderen Stil',
    suggestionModifyContent: 'Bitte ändern Sie den Notizinhalt und versuchen Sie es erneut',
    suggestionContentMayBeSensitive: 'Der Inhalt kann sensibles Material enthalten',
    suggestionAddContent: 'Bitte fügen Sie Inhalt zu Ihrer Notiz hinzu',

    // Preview Modal
    previewTitle: '📝 prompt-Vorschau',
    previewPromptLabel: 'Generierter Prompt (bearbeitbar):',
    previewCharacters: 'Zeichen',
    previewTipsTitle: '💡 tipps:',
    previewTip1: 'Sie können den Prompt bearbeiten, um den gewünschten Stil anzupassen',
    previewTip2: 'Das Hinzufügen spezifischer Farben, Layouts und Elemente führt zu besseren Ergebnissen',
    previewTip3: 'Verwenden Sie die Schaltfläche "Regenerieren", um einen neuen Prompt zu erstellen',
    previewGenerate: '🎨 bild generieren',
    previewRegenerate: '🔄 regenerieren',
    previewPromptModel: '🤖 prompt-Modell',
    previewImageModel: '🖼️ bildmodell',
    previewStyle: '📊 stil'
  }
};

/**
 * Get localized UI messages based on preferred language
 */
export function getMessages(language: PreferredLanguage): UIMessages {
  return MESSAGES[language] || MESSAGES.en;
}
