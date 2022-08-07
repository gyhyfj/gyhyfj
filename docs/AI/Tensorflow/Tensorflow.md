# Tensorflow

https://www.tensorflow.org/overview

TensorFlow 是一个端到端开源**机器学习平台**
借助 TensorFlow，初学者和专家可以轻松地创建**机器学习模型**

TensorFlow 的高阶 API 基于 Keras API 标准，用于定义和训练神经网络
Keras 通过用户友好的 API 实现快速原型设计、先进技术研究和生产

## Win10 安装 GPU 版本

> tensorflow 2.9.1
> kares 2.9.0
> keras-preprocessing 1.1.2
> tensorboard 2.6.0
> Python 3.9.12
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

5. 安装 keras-preprocessing 替换掉旧版本 1.0.5

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

## TensorBoard

TensorFlow 的可视化工具包
