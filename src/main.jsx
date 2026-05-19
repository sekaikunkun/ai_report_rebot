import React, { Suspense, lazy, useRef, useState, useCallback, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  BadgeCheck,
  Bot,
  Boxes,
  BrainCircuit,
  ChevronDown,
  Code2,
  FileText,
  GitBranch,
  Layers3,
  LineChart,
  MessageSquareText,
  Network,
  Orbit,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Workflow,
  Zap
} from "lucide-react";
import "./styles.css";

const Spline = lazy(() => import("@splinetool/react-spline"));
import aiEvolutionInfographic from "../imgs/ai-evolution-infographic.png";
import caseMigrationImage from "../imgs/case-migration.png";
import codexImage from "../imgs/codex.png";
import copilotImage from "../imgs/copilot.png";
import deepseekImage from "../imgs/deepseek.png";
import humanInspectImage from "../imgs/humanInspect.png";
import roleShiftInfographic from "../imgs/role-shift-infographic.png";
import traeImage from "../imgs/trae.png";
import uiIterationImage from "../imgs/ui-iteration.png";
import vibeCodingImage from "../imgs/vibeCoding.png";
import aiSuggestImage from "../imgs/AISuggest.png";
import aiGenUI1 from "../imgs/aiGenUI_1.png";
import aiGenUI2 from "../imgs/aiGenUI_2.png";
import aiGenUI3 from "../imgs/aiGenUI_3.png";
import aiGenUI4 from "../imgs/aiGenUI_4.png";

const timeline = [
  {
    title: "Copilot",
    desc: "代码补全、局部辅助、提高输入效率",
    year: "阶段 1",
    icon: Code2,
    points: ["减少重复代码输入", "根据上下文补全简单逻辑", "降低基础语法查找成本"]
  },
  {
    title: "DeepSeek",
    desc: "推理问答、代码解释、方案生成、文档处理",
    year: "阶段 2",
    icon: MessageSquareText,
    points: ["理解代码与业务概念", "生成接口文档和SQL", "整理汇报与方案对比"]
  },
  {
    title: "Cursor / Trae",
    desc: "AI IDE、项目上下文、代码重构",
    year: "阶段 3",
    icon: BrainCircuit,
    points: ["读取项目上下文", "理解多文件关系", "生成页面、组件和接口调用"]
  },
  {
    title: "OpenCode / Codex",
    desc: "Coding Agent、任务驱动、多文件修改",
    year: "阶段 4",
    icon: Bot,
    points: ["判断需要修改哪些文件", "执行命令并根据报错修复", "围绕目标完成功能闭环"]
  },
  {
    title: "Vibe Coding",
    desc: "人负责方向，AI 负责执行",
    year: "阶段 5",
    icon: Orbit,
    points: ["像负责人一样分配任务", "多线程推进不同模块", "人工审核关键质量和方向"]
  }
];

const toolGallery = [
  {
    title: "Copilot",
    stage: "代码补全",
    text: "局部辅助，提高输入效率",
    image: copilotImage
  },
  {
    title: "DeepSeek",
    stage: "推理问答",
    text: "解释代码、整理文档、生成方案",
    image: deepseekImage
  },
  {
    title: "Cursor / Trae",
    stage: "AI IDE",
    text: "读取项目上下文，理解多文件关系",
    image: traeImage
  },
  {
    title: "OpenCode / Codex",
    stage: "Coding Agent",
    text: "任务驱动、多文件修改、自动执行",
    image: codexImage
  },
  {
    title: "Vibe Coding",
    stage: "人定方向，AI 执行",
    text: "人负责判断、调度和审核，AI 负责具体执行",
    image: vibeCodingImage
  }
];

const changedWork = [
  {
    title: "代码开发",
    text: "从补充单行代码，到搭建框架、生成组件、编写接口调用、修复Bug和重构旧逻辑。",
    icon: Code2,
    tags: ["框架搭建", "组件生成", "Bug 修复"]
  },
  {
    title: "文档处理",
    text: "汇报大纲、技术方案、需求拆解、接口说明和测试用例都可以快速形成初稿。",
    icon: FileText,
    tags: ["方案初稿", "接口说明", "知识库整理"]
  },
  {
    title: "UI 设计",
    text: "先用 AI 生成多套 UI 方向图，确定风格后再开发，减少后期大量返工。",
    icon: Palette,
    tags: ["风格探索", "甲方确认", "快速迭代"]
  },
  {
    title: "项目理解与迁移",
    text: "AI 辅助阅读目录结构、接口逻辑、权限判断和隐藏业务规则，降低接手者项目成本。",
    icon: GitBranch,
    tags: ["旧逻辑分析", "迁移拆解", "上下文理解"]
  }
];

const roleShiftFlow = [
  {
    from: "逐步执行",
    to: "定义目标",
    text: "人先明确业务背景、交互边界、验收标准和不能改动的约束，AI 再进入执行。"
  },
  {
    from: "单点开发",
    to: "任务拆解",
    text: "把页面、接口、权限、Mock、UI风格和联调验证拆成可并行处理的小任务。"
  },
  {
    from: "写完再改",
    to: "审核收拢",
    text: "AI 给出初版，人负责 Code Review、业务规则确认、风险判断和最终取舍。"
  }
];
const roleResponsibilities = [
  ["方向", "确定目标、优先级和方案取舍"],
  ["上下文", "提供旧项目、接口、权限和UI参考"],
  ["拆解", "把复杂需求拆成可执行任务"],
  ["调度", "让多个AI任务并行推进"],
  ["审核", "检查代码质量、业务逻辑和安全风险"],
  ["决策", "对甲方反馈和关键问题做判断"]
];

const workflow = [
  { title: "需求梳理", note: "先明确目标、边界和可交互物" },
  { title: "AI 分析旧项目", note: "梳理页面、接口、权限和业务逻辑" },
  { title: "AI 搭建新框架", note: "生成初始目录、基础组件和路由" },
  { title: "Mock 页面生成", note: "先跑通页面结构和业务流程" },
  { title: "UI 风格迁移", note: "统一视觉方向，减少返工" },
  { title: "后端能力改造", note: "登录、权限、AI聊天和智能选铺" },
  { title: "功能联调与审核", note: "人工判断、测试验证、质量把关" }
];

const results = [
  { value: "2 天", label: "搭建初始框架", icon: Rocket },
  { value: "30+", label: "页面完成迁移", icon: Layers3 },
  { value: "Mock", label: "支持离线演示与并行开发", icon: Boxes },
  { value: "<1 月", label: "完成大量迁移升级", icon: TimerReset },
  { value: "权限", label: "新增小程序权限管理", icon: ShieldCheck },
  { value: "AI Chat", label: "新增AI聊天和智能选铺", icon: Sparkles }
];

const boost = [
  { title: "项目启动更快", text: "从空白项目到可运行框架，减少早期重复搭建。", icon: Rocket },
  { title: "UI 迭代更快", text: "把想法变成页面，再围绕真实页面讨论。", icon: Palette },
  { title: "功能迁移更快", text: "由AI辅助理解旧逻辑，降低迁移遗漏。", icon: Workflow },
  { title: "文档和沟通更快", text: "把上下文沉淀成需求、清单、评审材料。", icon: MessageSquareText }
];

const prerequisites = ["要有技术判断力", "要能拆解任务", "要能写清楚需求", "要能审核结果", "要有项目上下文", "要有完善文档"];
const suggestions = [
  {
    title: "不要只把 AI 当搜索工具",
    text: "推广 AI 时要引导大家进入真实工作流：开发、需求分析、UI探索、测试用例、老项目迁移和知识库建设。"
  },
  {
    title: "建立 AI 友好的项目文档规范",
    text: "沉淀项目结构、接口、数据库、权限、业务流程、UI规范和常见问题，既方便新人，也方便AI理解项目。"
  },
  {
    title: "在项目早期使用 AI 做原型和验证",
    text: "用AI快速做页面、Mock、UI方案和业务流程验证，让问题更早暴露，减少后期返工。"
  },
  {
    title: "培养 AI 协作型员工",
    text: "重点培养拆任务、写清楚需求、判断输出质量、组合多个AI工具和把AI融入流程的能力。"
  },
  {
    title: "建立 AI 输出审核机制",
    text: "代码必须Review，权限和数据库操作必须人工确认，关键功能必须测试通过，文档需要人工校对。"
  }
];

const impacts = ["代码开发", "文档处理", "UI 设计", "项目迁移", "Bug 排查", "原型验证"];

const openingImpacts = [
  "写代码",
  "理解旧项目",
  "处理文档",
  "生成 UI 方案",
  "迁移功能",
  "重构系统",
  "生成 Mock 数据",
  "辅助排查 Bug",
  "整理汇报材料",
  "将想法转化为可运行原型"
];

const caseDifficulties = ["老项目逻辑需要理解", "新项目结构需要重新搭建", "页面数量较多", "功能迁移工作量大", "UI 风格需要重新设计", "后端能力同步改造"];

const casePractice = [
  { title: "AI 生图", text: "快速生成科技风、政务风、简洁业务风、数据大屏风、小程序轻量风等方向，用于前期确认。" },
  { title: "AI IDE", text: "读取项目上下文，辅助页面开发、风格迁移、接口调用和问题定位。" },
  { title: "Coding Agent", text: "处理多文件修改、任务闭环、命令执行和基于报错的持续修复。" },
  { title: "人工审核", text: "负责方向判断、需求拆解、质量审核、关键代码和业务规则把关。" }
];

const migrationExamples = ["重构登录方式", "新增小程序权限管理", "辅助理解老项目接口", "迁移旧功能", "开发AI聊天功能", "开发智能选铺相关功能"];

const aiGenUIGallery = [
  { image: aiGenUI1, title: "科技风", desc: "深色主题、数据可视化风格，适合数据大屏和管理后台" },
  { image: aiGenUI2, title: "简洁业务风", desc: "清晰的信息层级与操作路径，适合内部业务系统" },
  { image: aiGenUI3, title: "轻量小程序风", desc: "紧凑布局、快速操作，适合移动端小程序" },
  { image: aiGenUI4, title: "政务风", desc: "稳重配色与结构化排版，适合政企类应用" }
];

function useReveal() {
  return {
    initial: { opacity: 0, y: 36, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.28 },
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
  };
}

function Section({ id, kicker, title, children, className = "" }) {
  const reveal = useReveal();
  return (
    <section id={id} className={`report-section ${className}`}>
      <motion.div {...reveal} className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-20 lg:px-10">
        {(kicker || title) && (
          <div className="max-w-4xl">
            {kicker && <p className="section-kicker">{kicker}</p>}
            {title && <h2 className="section-title">{title}</h2>}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}

function GlassCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ImageFeature({ src, title, caption, className = "" }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className={`image-feature ${className}`}
    >
      <img src={src} alt={title} />
      <figcaption>
        <strong>{title}</strong>
        <span>{caption}</span>
      </figcaption>
    </motion.figure>
  );
}

function AiFlowIllustration() {
  return (
    <div className="ai-flow-illustration" aria-hidden="true">
      <div className="flow-node human">人<br />方向</div>
      <div className="flow-lane">
        <span>需求</span>
        <span>上下文</span>
        <span>约束</span>
      </div>
      <div className="flow-core">
        <Bot size={46} />
        <strong>AI Agent</strong>
        <small>执行 / 修复 / 生成 / 总结</small>
      </div>
      <div className="flow-lane flow-lane-out">
        <span>代码</span>
        <span>UI</span>
        <span>文档</span>
      </div>
      <div className="flow-node review">人<br />审核</div>
    </div>
  );
}

function CapabilityRadar() {
  return (
    <div className="capability-radar" aria-hidden="true">
      <div className="radar-ring radar-a" />
      <div className="radar-ring radar-b" />
      <div className="radar-ring radar-c" />
      <div className="radar-center">小型团队能力</div>
      {["研发", "UI", "文档", "迁移", "Mock", "排障"].map((item, index) => (
        <span key={item} className={`radar-point radar-point-${index + 1}`}>{item}</span>
      ))}
    </div>
  );
}

function WorkIllustration() {
  return (
    <div className="work-illustration" aria-hidden="true">
      <div className="mini-window code-window">
        <span />
        <span />
        <span />
        <div className="code-line wide" />
        <div className="code-line" />
        <div className="code-line short" />
      </div>
      <div className="mini-window ui-window">
        <div className="ui-hero" />
        <div className="ui-grid">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="mini-window doc-window">
        <div className="doc-line" />
        <div className="doc-line short" />
        <div className="doc-line" />
        <div className="doc-badge">AI Summary</div>
      </div>
    </div>
  );
}

function ModeVisual() {
  return (
    <div className="mode-visual" aria-hidden="true">
      <div className="mode-stack manual">
        <span>查资料</span>
        <span>写代码</span>
        <span>迁移</span>
        <span>调UI</span>
        <span>沟通</span>
      </div>
      <div className="mode-arrow">&rarr;</div>
      <div className="mode-hub">
        <Bot size={42} />
        <strong>AI 协作</strong>
        <small>人负责判断与审核</small>
      </div>
      <div className="mode-stack output">
        <span>原型</span>
        <span>页面</span>
        <span>接口</span>
        <span>文档</span>
        <span>测试</span>
      </div>
    </div>
  );
}

function ConcurrentVisual() {
  return (
    <div className="concurrent-visual" aria-hidden="true">
      {[
        ["页面开发", "30+ 页面"],
        ["UI 迁移", "风格统一"],
        ["后端改造", "权限 / 登录"],
        ["Mock 联调", "提前验证"],
        ["智能能力", "AI Chat / 选铺"]
      ].map(([title, note], index) => (
        <div key={title} className={`task-card task-${index + 1}`}>
          <span>{title}</span>
          <strong>{note}</strong>
        </div>
      ))}
      <div className="task-center">人工调度<br />AI 并发执行</div>
    </div>
  );
}

function EfficiencyBoard() {
  return (
    <div className="efficiency-board" aria-hidden="true">
      {[
        ["启动", "2 天"],
        ["页面", "30+"],
        ["迁移", "<1 月"],
        ["协作", "多线程"]
      ].map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <i />
        </div>
      ))}
    </div>
  );
}

function Spotlight({ className, size = 200 }) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState(null);

  const mouseX = useSpring(0, { bounce: 0 });
  const mouseY = useSpring(0, { bounce: 0 });

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = "relative";
        parent.style.overflow = "hidden";
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;
    parentElement.addEventListener("mousemove", handleMouseMove);
    parentElement.addEventListener("mouseenter", () => setIsHovered(true));
    parentElement.addEventListener("mouseleave", () => setIsHovered(false));
    return () => {
      parentElement.removeEventListener("mousemove", handleMouseMove);
      parentElement.removeEventListener("mouseenter", () => setIsHovered(true));
      parentElement.removeEventListener("mouseleave", () => setIsHovered(false));
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={`pointer-events-none absolute rounded-full blur-xl transition-opacity duration-200 spotlight-glow ${
        isHovered ? "opacity-100" : "opacity-0"
      } ${className || ""}`}
      style={{ width: size, height: size, left: spotlightLeft, top: spotlightTop }}
    />
  );
}

function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="spline-loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}

function AiGenUICarousel() {
  return (
    <div className="tool-carousel">
      <div className="tool-carousel-head">
        <p className="section-kicker">AI Gen UI</p>
        <h3>AI 生成 UI 方向图</h3>
        <p>先用 AI 生成多套 UI 方向，确定风格后再开发，减少后期大量返工。横向滑动查看不同风格。</p>
      </div>
      <div className="tool-carousel-track" aria-label="AI 生成 UI 方向图画廊">
        {aiGenUIGallery.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, x: 34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.58, delay: index * 0.06 }}
            className="tool-slide"
          >
            <div className="tool-slide-copy">
              <span>{String(index + 1).padStart(2, "0")} / {item.title}</span>
              <p>{item.desc}</p>
            </div>
            <img src={item.image} alt={`AI 生成 UI 方向：${item.title}`} />
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-robot-container">
        <div className="hero-robot-left">
          <div className="hero-robot-card">
            <p className="hero-robot-kicker">Internal AI Delivery Report</p>
            <h1 className="hero-robot-title">
              AI 对个人工作方式<br />与项目交付效率的影响
            </h1>
            <p className="hero-robot-subtitle">
              从代码补全到 Vibe Coding：AI 如何让一个人具备"小团队"的交付能力
            </p>
            <p className="hero-robot-summary">
              AI 带来的不是单点工具效率提升，而是工作模式的变化。熟练使用 AI 后，
              一个人可以覆盖过去小型团队中一部分研发、设计、文档和迁移执行能力。
            </p>
            <div className="hero-robot-tags">
              {impacts.map((item) => (
                <span key={item} className="hero-robot-tag">{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-robot-scene">
          <div className="hero-robot-grid" />
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="hero-spline"
          />
        </div>
      </div>
    </section>
  );
}

function OpeningSection() {
  return (
    <Section id="opening" kicker="01 / 真实感受与核心观点" title='AI 已经不是"问答工具"，而是进入完整工作流的生产力工具'>
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassCard className="statement-card">
          <Zap className="mb-7 text-cyan" size={42} />
          <h3>我的真实感受</h3>
          <p>从 Copilot 到 DeepSeek、AI IDE，再到 Coding Agent，AI 的能力不是线性提升，而是火箭式迭代。</p>
          <div className="mt-8 rounded-2xl border border-cyan/20 bg-cyan/5 p-5 text-lg leading-9 text-slate-200">
            AI 对工作的改变，已经不只是"帮我查资料"或者"帮我写几行代码"，而是逐渐参与到完整交付流程中。
          </div>
        </GlassCard>
        <div className="statement-image-card">
          <img src={humanInspectImage} alt="人负责方向设定、任务拆解与结果审核的示意图片" />
        </div>
      </div>
      <div className="impact-cloud">
        {openingImpacts.map((item, index) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.035 }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </Section>
  );
}

function TimelineSection() {
  return (
    <Section id="timeline" kicker="02 / AI 工具演进" title="从代码补全到任务自动执行，AI 正在从工具走向协作者">
      <ImageFeature
        src={aiEvolutionInfographic}
        title="从工具到协作者"
        caption="代码补全、DeepSeek 推理问答、AI IDE、Coding Agent、Vibe Coding 的能力跃迁"
        className="wide-image-feature"
      />
      <div className="tool-carousel">
        <div className="tool-carousel-head">
          <p className="section-kicker">Tool Gallery</p>
          <h3>工具能力从"局部辅助"逐步走向"协作执行"</h3>
          <p>横向滑动查看不同阶段的工具形态。每一张图对应一个关键阶段，图片完整展示，说明文字放在上方。</p>
        </div>
        <div className="tool-carousel-track timeline-line timeline-line-horizontal" aria-label="AI 工具演进图片画廊与时间轴">
          {toolGallery.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, x: 34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.58, delay: index * 0.06 }}
              className="tool-slide"
            >
              <div className="tool-slide-copy">
                <span>{String(index + 1).padStart(2, "0")} / {item.stage}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <ul>
                  {(timeline[index]?.points ?? []).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <img src={item.image} alt={`${item.title} 工具阶段示意`} />
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function WorkChangeSection() {
  return (
    <Section id="work" kicker="03 / 工作变化" title="人的角色从执行者，转向方向设定、任务拆解与结果审核">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {changedWork.map((item, index) => {
          const Icon = item.icon;
          return (
            <GlassCard key={item.title} delay={index * 0.08}>
              <Icon className="mb-5 text-cyan" size={32} />
              <h3 className="card-title">{item.title}</h3>
              <p className="card-text">{item.text}</p>
            </GlassCard>
          );
        })}
      </div>
      <motion.figure
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
        className="role-shift-visual"
      >
        <img src={roleShiftInfographic} alt="人的角色从执行者转向调度者和审核者的示意图" />
        <figcaption>
          <span>核心变化</span>
          <strong>少做重复执行，多做方向判断</strong>
        </figcaption>
      </motion.figure>
    </Section>
  );
}

function CaseSection() {
  return (
    <Section id="case" kicker="04 / 案例：资管通项目" title="老项目迁移升级：从零搭建新小程序，复用既有后端能力">
      <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="flex flex-col justify-between">
          <div>
            <Network className="mb-5 text-violet" size={36} />
            <h3 className="card-title">项目挑战</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              新项目从零搭建，沿用老项目后端，小程序全部重新开发，同时进行功能升级。
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["老项目理解", "新框架搭建", "页面迁移", "UI 重设计", "后端改造"].map((item) => <div key={item} className="mini-chip">{item}</div>)}
          </div>
        </GlassCard>
        <ImageFeature
          src={caseMigrationImage}
          title="旧项目迁移升级"
          caption="老后端、新小程序、权限与智能能力改造"
          className="case-image-feature"
        />
      </div>
      <div className="efficiency-board">
        {[
          ["启动", "2 天"],
          ["页面", "30+"],
          ["迁移", "<1 月"],
          ["协作", "多线程"]
        ].map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <i />
          </div>
        ))}
      </div>
      <GlassCard className="result-summary">
        <div>
          <p className="section-kicker">最终结果</p>
          <h3>不到 1 个月，完成较大范围迁移和升级</h3>
          <p>新小程序从零搭建，30 多个页面初步完成，支持Mock，UI 风格完成改造，登录方式重构，新增AI 聊天和智能选铺功能。</p>
        </div>
      </GlassCard>
      <AiGenUICarousel />
    </Section>
  );
}

function PremiseSection() {
  return (
    <Section id="premise" kicker="05 / 前提与建议" title="让 AI 进入项目体系，而不是停留在个人尝试">
      <motion.figure
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        className="ai-suggest-figure"
      >
        <img src={aiSuggestImage} alt="AI 进入项目体系建议图" />
      </motion.figure>
      <GlassCard className="statement-card">
        <h3>AI 的上限取决于使用者</h3>
        <p>真正重要的能力，不只是会不会用 AI，而是能不能把工作拆解成 AI 可以执行的任务。</p>
      </GlassCard>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: "建立文档规范", text: "沉淀项目结构、接口、权限和业务流程，方便AI理解项目。" },
          { title: "培养协作能力", text: "重点培养拆任务、写清需求、判断输出质量的能力。" },
          { title: "建立审核机制", text: "代码必须Review，关键操作必须人工确认。" }
        ].map((item, index) => (
          <GlassCard key={item.title} delay={index * 0.06} className="premise-card">
            <BadgeCheck className="text-cyan" size={24} />
            <div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}

function Ending() {
  return (
    <section className="ending-section">
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-6xl px-6 text-center"
      >
        <LineChart className="mx-auto mb-8 text-cyan" size={54} />
        <h2>AI 不会直接替代所有人，但会让会使用 AI 的人拥有更强的交付能力。</h2>
        <p>未来，一个人的效率可能不再只取决于个人能力，也取决于他能否有效调度 AI。</p>
        <div className="ending-points">
          <span>AI 已经从辅助工具变成工作流的一部分</span>
          <span>资管通项目验证了项目搭建、UI 迭代、功能迁移和后端改造提效</span>
          <span>未来差距来自能否用 AI 放大自己的能力</span>
        </div>
      </motion.div>
    </section>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return <motion.div className="progress-bar" style={{ scaleX }} />;
}

function App() {
  return (
    <>
      <ProgressBar />
      <main>
        <Hero />
        <OpeningSection />
        <TimelineSection />
        <WorkChangeSection />
        <CaseSection />
        <PremiseSection />
        <Ending />
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
