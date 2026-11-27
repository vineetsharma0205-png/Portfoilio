# Autodesk Fusion 360 CAD Projects

Engineering CAD models, kinematic mechanisms, and mechanical drafting sheets designed and modeled in **Autodesk Fusion 360** by **Vineet Sharma** (B.Tech Mechanical Engineering, IIITDM Kurnool).

---

## 📂 Repository Structure

```
cad-projects/fusion-360/
├── pdp-kinetic-lamp/              # Ambient Node / Kinetic Articulated Desk Lamp
│   ├── PDP_Lamp_Assembly.f3d      # Master Kinematic Assembly
│   ├── PDP_Lamp_Base.f3d          # Weighted Base Housing & Electronics Cavity
│   ├── PDP_Lamp_Mid_Link.f3d      # Mid Articulated Arm Linkage
│   ├── Connecting_Rod.f3d         # Connecting Rod for Articulation
│   ├── Crank.f3d                  # Drive Crank Mechanism
│   ├── assembly_render.png        # Assembly Isometric Render
│   └── base_render.png            # Base Component Render
│
└── mechanical-drafting/           # Technical Engineering Drawings & GD&T
    ├── Drafting_Drawings.f3d      # 2D Mechanical Drafting Sheets & Orthographic Views
    └── drafting_sheet_preview.png # Drawing Sheet Preview
```

---

## 🛠️ Project Details

### 1. PDP Kinetic Lamp (Ambient Node)
* **Category**: Kinetic Mechanism / Parametric Consumer Product Design
* **Software**: Autodesk Fusion 360
* **Core Kinematics**: Four-bar linkage mechanism with articulated joints, internal wire routing channels, and counterbalance geometry.
* **Engineering Considerations**:
  - **Modular Architecture**: Designed for rapid disassembly and repeatable maintenance (15% assembly time reduction).
  - **Thermal Management**: Airflow clearance around LED mounting bracket to dissipate thermal dissipation loads without heat entrapment.
  - **DFM/DFA**: Optimized draft angles and wall thicknesses for additive manufacturing (3D printing) and injection-molded enclosures.

#### Component Breakdown:
| File | Role | Description |
| :--- | :--- | :--- |
| `PDP_Lamp_Assembly.f3d` | Top-Level Assembly | Full kinematic assembly with joint limits and motion linkages. |
| `PDP_Lamp_Base.f3d` | Structural Base | Weighted pedestal housing power circuitry, touch controls, and swivel bearing. |
| `PDP_Lamp_Mid_Link.f3d` | Intermediate Arm | Articulated segment transmitting rotational and vertical displacement. |
| `Connecting_Rod.f3d` | Kinematic Linkage | Link rod ensuring synchronized dual-axis pivot motion. |
| `Crank.f3d` | Actuation Crank | Drives smooth articulation and holds positioning against gravity. |

---

### 2. Mechanical Drafting & Engineering Drawings
* **Category**: Manufacturing & Production Documentation
* **Standards**: BIS / ISO Engineering Drawing Conventions & GD&T
* **Contents**:
  - First-angle orthographic projections (Front, Top, Side).
  - Detailed section views highlighting internal wall profiles, fastener bosses, and counterbores.
  - Dimensional tolerances and surface finish callouts for production machining and tooling.

---

## 🚀 How to Open in Autodesk Fusion

1. Launch **Autodesk Fusion** (or Fusion 360).
2. Click **File** (`Ctrl + O`) → **Open...**.
3. Select **Open from my computer** and choose any `.f3d` file from this directory.
4. *Alternatively*, open your Fusion Team data panel, click **Upload**, and drag in the `.f3d` files to import them directly into your project workspace.

---

## 👤 Author

**Vineet Sharma**  
- Portfolio: [https://vineetsharma0205.vercel.app/](https://vineetsharma0205.vercel.app/)  
- GitHub: [https://github.com/vineetsharma0205-png](https://github.com/vineetsharma0205-png)  
- Email: [vineetsharma.0205@gmail.com](mailto:vineetsharma.0205@gmail.com)  
