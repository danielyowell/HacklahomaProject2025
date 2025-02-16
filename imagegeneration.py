import os
import torch
import google.generativeai as genai
from PIL import Image
from diffusers import StableDiffusionXLImg2ImgPipeline, ControlNetModel, StableDiffusionXLControlNetPipeline
from transformers import AutoProcessor, Blip2ForConditionalGeneration

# ✅ Setup API Key for Gemini
genai.configure(api_key="AIzaSyBgITFxTm0G3Geldvc9QaoDlf9Ve-O2RIU")

# ✅ Step 1: Generate Comic Story Using Gemini
def generate_gemini_response(prompt):
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(prompt)
    return response.text

source_code = """
class Superhero:
    def __init__(self, name, power):
        self.name = name
        self.power = power

    def fight(self):
        print(f"{self.name} is fighting using {self.power}!")
"""

comic_story_description = generate_gemini_response(f"Describe this source code as a comic story:\n{source_code}")
character_prompt = generate_gemini_response(f"Extract the main character's appearance from this story:\n{comic_story_description}")
art_style = generate_gemini_response(f"Describe the art style best suited for this story:\n{comic_story_description}")
comic_panels = generate_gemini_response(f"Break down this comic story into 5 comic panel descriptions:\n{comic_story_description}").split("\n")

print("🎭 Comic Story:", comic_story_description)
print("🦸 Character Description:", character_prompt)
print("🎨 Art Style:", art_style)

# ✅ Step 2: Set Up SDXL & ControlNet for High-Quality Comics
output_folder = "generated_comics"
os.makedirs(output_folder, exist_ok=True)

model_id = "stabilityai/stable-diffusion-xl-base-1.0"
controlnet_model = "lllyasviel/control_v11p_sd15_openpose"  # Ensures consistent poses across panels

# ✅ Load SDXL Model
pipe = StableDiffusionXLImg2ImgPipeline.from_pretrained(
    model_id, torch_dtype=torch.float16, variant="fp16"
).to("cuda")

# ✅ Load ControlNet for Pose Consistency
controlnet = ControlNetModel.from_pretrained(controlnet_model, torch_dtype=torch.float16).to("cuda")
pose_pipe = StableDiffusionXLControlNetPipeline.from_pretrained(
    model_id, controlnet=controlnet, torch_dtype=torch.float16
).to("cuda")

# ✅ Step 3: Generate Base Character Reference
base_character_prompt = f"{character_prompt}, {art_style}, full-body pose, clean background"
print("🎨 Generating Character Reference...")
character_reference = pipe(prompt=base_character_prompt, guidance_scale=8.5).images[0]
character_ref_path = os.path.join(output_folder, "character_reference.png")
character_reference.save(character_ref_path)

# ✅ Step 4: Extract Pose from Character Reference (Using BLIP)
processor = AutoProcessor.from_pretrained("Salesforce/blip2-opt-2.7b")
blip_model = Blip2ForConditionalGeneration.from_pretrained("Salesforce/blip2-opt-2.7b").to("cuda")

inputs = processor(character_reference, return_tensors="pt").to("cuda")
pose_prompt = blip_model.generate(**inputs)
pose_description = processor.batch_decode(pose_prompt, skip_special_tokens=True)[0]
print("🕺 Extracted Pose Description:", pose_description)

# ✅ Step 5: Generate Comic Panels with Consistent Character & Scene Adaptation
initial_image = character_reference
for i, scene in enumerate(comic_panels):
    print(f"🎨 Generating Panel {i+1} with consistent character and adaptive background...")

    panel_prompt = f"{character_prompt}, {art_style}, {scene}, same character pose as '{pose_description}'"

    generated_image = pose_pipe(
        prompt=panel_prompt,
        image=initial_image.convert("RGB"),
        strength=0.55,
        guidance_scale=7.5
    ).images[0]

    image_path = os.path.join(output_folder, f"panel_{i+1}.png")
    generated_image.save(image_path)

    initial_image = generated_image

print("✅ Comic panels generated with a consistent character and evolving backgrounds!")
