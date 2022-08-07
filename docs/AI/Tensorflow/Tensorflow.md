# Tensorflow

## Win10 安装 GPU 版本

> tensorflow 2.9.1
> kares 2.9.0
> keras-preprocessing 1.0.5
> Miniconda3-py39_4.12.0-Windows-x86_64

1. 安装 miniconda
2. 配置 conda 和 pip 清华大学镜像

   ```bash
   pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
   ```

   .condarc

   ```js
   ssl_verify: true
   channels:
     - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
     - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
     - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
     - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
     - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
     - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/fastai/
     - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
     - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
   show_channel_urls: true
   ```

3. 安装 tensorflow-gpu
   可能需要修改 miniconda 安装目录权限，后以管理员身份运行 Anaconda Prompt

   ```bash
   conda install tensorflow-gpu
   ```

4. 安装其他包

   ```bash
   pip install pandas matplotlib notebook keras
   ```

5. 安装 keras-preprocessing 替换掉旧版本

   ```bash
   pip install keras-preprocessing
   ```

6. 在 Terminal 中配置 Anaconda Prompt (Miniconda3)

   ```js
   命令行：
   cmd.exe /K  C:\ProgramData\Miniconda3\Scripts\activate.bat
   ```

7. 验证安装
   打开 jupyter notebook 尝试引入 tensorflow，看是否引入成功

   ```python
   import tensorflow as tf
   ```
